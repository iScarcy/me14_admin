import { createAction, props } from "@ngrx/store"
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { IDeleteRequestModel, IGetAlbumFotoRequestModel, IGetAlbumsRequestModel, INewAlbumFotoRequestModel, INewAlbumRequestModel, IRotateAlbumFotoRequestModel } from "./albums.model";
import { IFoto } from "src/app/models/IFoto";

export const LOAD_ALBUMS = '[Gallery page] load albums'
export const LOAD_ALBUMS_SUCCESS = '[Gallery page] load albums success'

export const DELETE_ALBUM = '[Gallery page] delete album'
export const DELETE_ALBUM_SUCCESS = '[Gallery page] delete album success' 

export const NEW_ALBUM = '[Gallery page] new album'
export const NEW_ALBUM_SUCCESS = '[Gallery page] new album success'  

export const LOAD_ALBUM_FOTO = '[Gallery page] load foto albums'
export const LOAD_ALBUM_FOTO_SUCCESS = '[Gallery page] load foto albums success'

export const NEW_ALBUM_FOTO = '[Gallery page] new album foto'
export const NEW_ALBUM_FOTO_SUCCESS = '[Gallery page] new album foto success'  

export const DELETE_ALBUM_FOTO = '[Gallery page] delete album foto'
export const DELETE_ALBUM_FOTO_SUCCESS = '[Gallery page] delete album success foto' 

export const ROTATE_ALBUM_FOTO = '[Gallery page] rotate album foto'
export const ROTATE_ALBUM_FOTO_SUCCESS = '[Gallery page] rotate album success foto' 

//IGetAlbumsRequestModel
export const loadalbums=createAction(LOAD_ALBUMS, props<{branca:string, token:string }>());
export const loadalbumssuccess=createAction(LOAD_ALBUMS_SUCCESS, props<{albums:IAlbumFoto[]}>());

export const deletealbum=createAction(DELETE_ALBUM, props<{data: IDeleteRequestModel}>());
export const deletealbumsuccess=createAction(DELETE_ALBUM_SUCCESS, props<{data: IDeleteRequestModel}>());

export const newalbum=createAction(NEW_ALBUM, props<{data: INewAlbumRequestModel}>())
export const newalbumsuccess=createAction(NEW_ALBUM_SUCCESS, props<{album: IAlbumFoto}>())

export const loadalbumfoto=createAction(LOAD_ALBUM_FOTO, props<{data: IGetAlbumFotoRequestModel}>())
export const loadalbumfotosuccess=createAction(LOAD_ALBUM_FOTO_SUCCESS, props<{album: IAlbumFoto}>())

export const newalbumfoto=createAction(NEW_ALBUM_FOTO, props<{data: INewAlbumFotoRequestModel}>())
export const newalbumfotosuccess=createAction(NEW_ALBUM_FOTO_SUCCESS, props<{photo: Array<IFoto>}>())

export const deletealbumfoto=createAction(DELETE_ALBUM_FOTO, props<{data: IDeleteRequestModel}>())
export const deletealbumfotosuccess=createAction(DELETE_ALBUM_FOTO_SUCCESS, props<{data: IDeleteRequestModel}>())

export const rotatealbumfoto=createAction(ROTATE_ALBUM_FOTO, props<{data: IRotateAlbumFotoRequestModel}>())
export const rotatealbumfotosuccess=createAction(ROTATE_ALBUM_FOTO_SUCCESS, props<{data: number}>())

