import { Branca } from "./Branca";

export interface IAlbum{
    id: number,
    title: string,
    anno: number,
    branca: Branca,
    folder: string,
    file: string,
    data: Date,
    fullPath:string,
    status: boolean
}