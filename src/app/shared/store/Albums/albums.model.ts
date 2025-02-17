import { IAlbum } from "src/app/models/IAlbum";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";

export interface IAlbumsModel{
    albums:IAlbumFoto[]
}

export interface IStoreModel{
    data: IAlbumsModel,
    type: string
}

/*riquest*/ 

export interface IGetAlbumsRequestModel{
    branca:string
}

export interface IGetAlbumsStoreRequest extends IStoreRequest{
    data:IGetAlbumsRequestModel
}

export interface IDeleteAlbumRequestModel{
    id:number
}

export interface IDeleteAlbumStoreRequesst extends IStoreRequest{
    data:IDeleteAlbumRequestModel
}

export interface IStoreRequest{
    type:string
}