export type tweet = {
    username: string;
    text: string;
    date: Date;
    tags?: string[];
    replies?: tweet[];
}