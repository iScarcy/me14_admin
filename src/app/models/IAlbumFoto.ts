import { IFoto } from "./IFoto";

export interface IAlbumFoto{
    id: number,
    title: string,
    anno: number,
    branca: string,
  //  folder: string,
    imgFolderUrl: string,
    foto: Array<IFoto>
}