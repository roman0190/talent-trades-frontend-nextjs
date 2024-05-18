export type User = {
    username: string;
    id: number;
    email: string;
    joinDate: string;
    pfp?: string;
};
export type Gig = {
    title: string;
    id: number;
    description: string;
    price: number;
    gigImage: string;
    gigThumbnail: string;
};
