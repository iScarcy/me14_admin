import { createAction, props } from "@ngrx/store"
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { IDeleteAlbumRequestModel, IGetAlbumsRequestModel, INewAlbumRequestModel } from "./albums.model";

export const LOAD_ALBUMS = '[Gallery page] load albums'
export const LOAD_ALBUMS_SUCCESS = '[Gallery page] load albums success'

export const DELETE_ALBUM = '[Gallery page] delete album'
export const DELETE_ALBUM_SUCCESS = '[Gallery page] delete album success' 

export const NEW_ALBUM = '[Gallery page] new album'
export const NEW_ALBUM_SUCCESS = '[Gallery page] new album success'  

export const loadalbums=createAction(LOAD_ALBUMS, props<{data:IGetAlbumsRequestModel}>());
export const loadalbumssuccess=createAction(LOAD_ALBUMS_SUCCESS, props<{albums:IAlbumFoto[]}>());

export const deletealbum=createAction(DELETE_ALBUM, props<{data: IDeleteAlbumRequestModel}>());
export const deletealbumsuccess=createAction(DELETE_ALBUM_SUCCESS, props<{data: IDeleteAlbumRequestModel}>());

export const newalbum=createAction(NEW_ALBUM, props<{data: INewAlbumRequestModel}>())
export const newalbumsuccess=createAction(NEW_ALBUM_SUCCESS, props<{album: IAlbumFoto}>())