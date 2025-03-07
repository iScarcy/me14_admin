import { Branca } from "./Branca";

export interface IAlbum{
    id: number,
    title: string,
    anno: number,
    branca: string,
    folder: string,
    file: string,
    folderUrl:string,
    status: boolean
}