import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { ILogin } from "src/app/models/ILogin";
 

export interface AppStateModel{
    albums:IAlbumFoto[],
    login:ILogin
}