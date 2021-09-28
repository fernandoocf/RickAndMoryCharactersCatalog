import { Component, HostListener } from '@angular/core';
import { Character } from './character';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isLoading:boolean = true;
  stopNewRequests: boolean = false;
  lastPageQuery: number = 0;
  characters: Array<Character> = [];
  totalPages:number = 1;
  constructor(private service: CharacterService) {}

  ngOnInit() {
    this.getCharacters(this.lastPageQuery);
  }

  getFirstEpisode(character: Character) {
    this.service.getFirstEpsodeOfCharacter(character.episode[0]).subscribe((response:any) => {
      character.firstEpisode = `${response.episode + ' - ' + response.name}`;
      this.characters.push(character);
    });
  }

  getCharacters(page: number) {
    this.service.getCharactersByPage(page).subscribe((response:any) => {
      this.totalPages = response.info.pages
      let characters = response.results;
        characters.forEach((character:any) => {
          this.getFirstEpisode(character);
        });
      this.lastPageQuery++; 
    }, 
    (err) => {console.log(err)},
    () => {this.stopNewRequests = false});
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(): void {
    const infiniteLoading: any = document.getElementById("infiniteLoading");
    if (this.isInViewPort(infiniteLoading) && !this.stopNewRequests)   {
      this.stopNewRequests = true;
      setTimeout(() => {
        if (this.totalPages <= this.lastPageQuery) {
          alert("No more caracteres to load. (We're waiting for new episodes =))")
          this.isLoading = false;
        } else {
          this.getCharacters(this.lastPageQuery); 
        }
      }, 2000);
    }
  }

  isInViewPort(element:any) {
    var bounding = element.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
