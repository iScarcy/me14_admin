import { IFoto } from "./IFoto";

export interface IAlbumFoto{
    id: number,
    title: string,
    anno: number,
    branca: string,
    foto: Array<IFoto>
}