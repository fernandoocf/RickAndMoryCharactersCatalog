export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type?: any;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: Array<string>;
    firstEpisode: string;
    url: Date;
    created: Date;
};

export interface Origin {
    name: string;
    url: Date;
};

export interface Location {
    name: string;
    url: string;
};

