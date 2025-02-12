import { IAlbumRequest } from "./IAlbumRequest";

export interface AlbumDialogData {
    album: IAlbumRequest,
    callback: () => void;
}