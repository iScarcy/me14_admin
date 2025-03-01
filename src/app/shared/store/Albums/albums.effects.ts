import { GalleryService } from "src/app/services/gallery.service";
import { DELETE_ALBUM, deletealbumsuccess, LOAD_ALBUM_FOTO, LOAD_ALBUMS, loadalbumfotosuccess, loadalbums, loadalbumssuccess, NEW_ALBUM, NEW_ALBUM_FOTO, newalbumfotosuccess, newalbumsuccess } from "./albums.actions";
import { exhaustMap, map, merge, mergeAll, mergeMap } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IAlbumRequest } from "src/app/models/IAlbumRequest";
import { IDeleteAlbumStoreRequest, IGetAlbumFotoStoreRequest, IGetAlbumsRequestModel, IGetAlbumsStoreRequest, INewAlbumFotoStoreRequest, INewAlbumStoreRequest } from "./albums.model";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { baseGalleryPublicImageUrl } from "src/app/app.costant";
import { IFoto } from "src/app/models/IFoto";

@Injectable()
export class AlbumEffects {
  effects$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_ALBUMS),
      exhaustMap((action:IGetAlbumsStoreRequest) => {
        
        return this.galleryService.getAlbums(action.data.branca).pipe(
          map((data) => {
           
            return loadalbumssuccess({ albums: data });
          })
        );
      })
    )
  );

  effectsDelete$ = createEffect(() =>
    this.action$.pipe(
      ofType(DELETE_ALBUM),
      exhaustMap((action: IDeleteAlbumStoreRequest) => {
        return this.galleryService
          .deleteAlbum(action.data.id)
          .pipe(
            map((data) => {
              return deletealbumsuccess({ data: action.data });
            })
          );
      })
    )
  );

  effectsNew$ = createEffect(() =>
    this.action$.pipe(
      ofType(NEW_ALBUM),
      exhaustMap((action: INewAlbumStoreRequest) => {
        return this.galleryService
          .newAlbum(action.data.request)
          .pipe(
            map((album) => {
            
              var albumFoto: IAlbumFoto = {
                id: album.id,
                title: album.title,
                anno: album.anno,
                branca: album.branca,
                folder: album.folder,
                imgPathFolder: baseGalleryPublicImageUrl + album.anno + "/" + album.branca + "/" + album.folder + "/" + album.file,
                foto: []
              }
              return newalbumsuccess({ album: albumFoto });
            })
          );
      })
    )
  );

  effectsFoto$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_ALBUM_FOTO),
      exhaustMap((action: IGetAlbumFotoStoreRequest) => {
        return this.galleryService
          .getFoto(action.data.album) 
          .pipe(
            map((album) => {
            
              var albumFoto: IAlbumFoto = {
                id: album.id,
                title: album.title,
                anno: album.anno,
                branca: album.branca,
                folder: album.folder,
                imgPathFolder: baseGalleryPublicImageUrl + album.imgPathFolder,
                foto: album.foto
              }
              return loadalbumfotosuccess({ album: albumFoto });
            })
          );
      })
    )
  );

  effectsNewFoto$ = createEffect(() =>
    this.action$.pipe(
      ofType(NEW_ALBUM_FOTO),
      exhaustMap((action:INewAlbumFotoStoreRequest) => {
        debugger;
        return this.galleryService.uploadAlbumFoto(action.data.request).pipe(
          map((data) => {
           
            return newalbumfotosuccess({ photo: data });
          })
        );
      })
    )
  );

  /*
  effectsNewFoto$ = createEffect(() =>
    this.action$.pipe(
      ofType(NEW_ALBUM_FOTO),
      exhaustMap((action: INewAlbumFotoStoreRequest) => {
        return this.galleryService
          .uploadAlbumFoto(action.data.request) 
          .pipe(
             map(response =>  response.map(foto => {
             
              var foto: IFoto = {
                    id: foto.id,
                    albumID: foto.albumID,
                    file: foto.file,
                    thumbPathFile: foto.thumbPathFile,
                    mediumPathFile: foto.mediumPathFile,
                    fullPathFile: foto.fullPathFile
                }
              }
              
          ))
          );
          return newalbumfotosuccess({ photo: foto });
      })
    )
  );
  */
  
  constructor(
    private action$: Actions,
    private galleryService: GalleryService   
  ) {}
}