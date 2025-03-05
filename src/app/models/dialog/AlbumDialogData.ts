import { IAlbumRequest } from "../IAlbumRequest";

export interface AlbumDialogData {
    titleDialog:string,
    album: IAlbumRequest,
    callback: (request:IAlbumRequest) => void;
}