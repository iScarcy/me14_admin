import { IAlbum } from "src/app/models/IAlbum";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { IAlbumFotoRequest } from "src/app/models/IAlbumFotoRequest";
import { IAlbumRequest } from "src/app/models/IAlbumRequest";

export interface IAlbumsModel{
    albums:IAlbumFoto[]
}

export interface IStoreModel{
    data: IAlbumsModel,
    type: string
}

/*ALBUM*/ 

export interface IGetAlbumsRequestModel{
    branca:string
}

export interface IGetAlbumsStoreRequest extends IStoreRequest{
    data:IGetAlbumsRequestModel
}

export interface IDeleteRequestModel{
    idAlbum:number,
    idFoto:number | undefined
}

export interface IDeleteStoreRequest extends IStoreRequest{
    data:IDeleteRequestModel
}

 

export interface INewAlbumRequestModel{
   request:IAlbumRequest
}

export interface INewAlbumStoreRequest extends IStoreRequest{
    data:INewAlbumRequestModel
}

//FOTO

export interface IGetAlbumFotoRequestModel{
    idAlbum:number
}

export interface IGetAlbumFotoStoreRequest extends IStoreRequest{
    data:IGetAlbumFotoRequestModel
}

export interface INewAlbumFotoRequestModel{
    request:IAlbumFotoRequest
 }
 
 export interface INewAlbumFotoStoreRequest extends IStoreRequest{
     data:INewAlbumFotoRequestModel
 }

//COMMON

export interface IStoreRequest{
    type:string
}