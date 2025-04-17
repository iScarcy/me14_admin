import { IAlbumRequest } from "../../services/rest/IAlbumRequest";

export interface AlbumDialogData {
    titleDialog:string,
    
    album: IAlbumRequest,
    callback: (request:IAlbumRequest) => void;
}