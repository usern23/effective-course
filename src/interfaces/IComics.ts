export interface IComics {
    id: number;
    title: string;
    description: string | null;
    thumbnail: {
        path: string;
        extension: string;
    };
    isFavorite: boolean;
    series?: {
        resourceURI: string;
        name: string;
    };
    issueNumber?: number;
    pageCount?: number;
    format?: string;
}