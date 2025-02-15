import { createAction, props } from "@ngrx/store"
import { IAlbumFoto } from "src/app/models/IAlbumFoto";

export const LOAD_ALBUMS = '[Gallery page] load albums'
export const LOAD_ALBUMS_SUCCESS = '[Gallery page] load albums success'

export const loadalbums=createAction(LOAD_ALBUMS, props<{branca:string}>());
export const loadalbumssuccess=createAction(LOAD_ALBUMS_SUCCESS, props<{albums:IAlbumFoto[]}>());