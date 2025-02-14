import { IAlbum } from "src/app/models/IAlbum";

export interface IAlbumsModel{
    albums:IAlbum[]
}

export interface IStoreModel{
    data: IAlbumsModel,
    type: string
}