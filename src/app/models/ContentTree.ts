export interface content {
    path: string;
    modificationDate: string;
    name: string;
    type: string;
    size?: number;
    content?: content[];
}

export interface ContentTree {
    contentTree: content[];
}