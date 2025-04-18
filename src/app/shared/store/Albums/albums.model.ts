import { IAlbum } from "src/app/models/IAlbum";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { IAlbumFotoRequest } from "src/app/services/rest/IAlbumFotoRequest";
import { IAlbumRequest } from "src/app/services/rest/IAlbumRequest";
import { IFotoRotateRequest } from "src/app/services/rest/IFotoRotateRequest";

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
    branca:string, anno:string, token:string
}

export interface IDeleteRequestModel{
    idAlbum:number,
    idFoto:number | undefined
}

export interface IDeleteStoreRequest extends IStoreRequest{
    data:IDeleteRequestModel
}

 

export interface INewAlbumRequestModel{
   request:IAlbumRequest, token:string
}
 
/*
export interface INewAlbumStoreRequest extends IStoreRequest{
    data:INewAlbumRequestModel
}
*/
//FOTO

export interface IGetAlbumFotoRequestModel  extends IStoreRequest{
    idAlbum:number,
    token:string
}

/*
export interface IGetAlbumFotoStoreRequest{
    data:IGetAlbumFotoRequestModel
}
*/
export interface INewAlbumFotoRequestModel{
    request:IAlbumFotoRequest
 }
 
 export interface INewAlbumFotoStoreRequest extends IStoreRequest{
     data:INewAlbumFotoRequestModel
 }
  
 export interface IRotateAlbumFotoRequestModel{
    request:IFotoRotateRequest
}

export interface IRotateAlbumFotoStoreRequest extends IStoreRequest{
    data:IRotateAlbumFotoRequestModel
}
//COMMON

export interface IStoreRequest{
    type:string
}