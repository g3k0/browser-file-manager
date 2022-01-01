export interface Content {
    path: string;
    modificationDate: string;
    name: string;
    type: string;
    size?: number;
    content?: Content[];
    keyboardSelected?: boolean;
}

export interface ContentTree {
    contentTree: Content[];
}