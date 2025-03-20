import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { ILoginModel } from "../Login/login.model";
 

export interface AppStateModel{
    albums:IAlbumFoto[],
    login:ILoginModel
}