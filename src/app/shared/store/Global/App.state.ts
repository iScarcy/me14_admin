import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { ILogin } from "src/app/models/ILogin";
import { IAlbumsModel } from "../Albums/albums.model";
import { ILoginModel } from "../Login/login.model";
 

export interface AppStateModel{
    albums:IAlbumFoto[],
    login:ILogin
}

export interface IAppStateModel{
    albums:IAlbumsModel,
    login:ILoginModel
}

export interface IAppStateInfoLogin{
    data:ILogin
}