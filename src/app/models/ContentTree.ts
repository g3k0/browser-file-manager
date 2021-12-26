interface file {
    path: string;
    modificationDate: string;
    type: string;
    size: number;
}

interface folder {
    path: string;
    modificationDate: string;
    name: string;
    type: string;
    content: (folder|file)[];
}

export interface ContentTree {
    contentTree: (folder|file)[];
}