import { BookItem } from "./book";

export interface ChapterItem {
    id?: number,
    title?: string,
    order_chap?: number,
    book?: BookItem;
    file_url: string;
}