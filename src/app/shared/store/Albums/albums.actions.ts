import { createAction, props } from "@ngrx/store"
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { IGetAlbumsRequestModel } from "./albums.model";

export const LOAD_ALBUMS = '[Gallery page] load albums'
export const LOAD_ALBUMS_SUCCESS = '[Gallery page] load albums success'

export const loadalbums=createAction(LOAD_ALBUMS, props<{data:IGetAlbumsRequestModel}>());
export const loadalbumssuccess=createAction(LOAD_ALBUMS_SUCCESS, props<{albums:IAlbumFoto[]}>());