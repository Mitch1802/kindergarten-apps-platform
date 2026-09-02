export interface IGruppe {
    pkid: number;
    id: string;
    name: string;
    bild: string | null;
}

export interface IKategorie {
    pkid: number;
    id: string;
    name: string;
    bild: string | null;
}

export interface IKind {
    pkid: number;
    id: string;
    name: string;
    farbe: string;
    gruppe: number;
    gruppe_name: string;
    kategorien: number[];
    kategorien_detail: IKategorie[];
}
