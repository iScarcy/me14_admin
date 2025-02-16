import { IAlbum } from "src/app/models/IAlbum";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";

export interface IAlbumsModel{
    albums:IAlbumFoto[]
}

export interface IStoreModel{
    data: IAlbumsModel,
    type: string
}