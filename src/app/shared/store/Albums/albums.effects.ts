import { GalleryService } from "src/app/services/gallery.service";
import { DELETE_ALBUM, DELETE_ALBUM_FOTO, deletealbumfotosuccess, deletealbumsuccess, LOAD_ALBUM_FOTO, LOAD_ALBUMS, loadalbumfotosuccess, loadalbums, loadalbumssuccess, NEW_ALBUM, NEW_ALBUM_FOTO, newalbumfotosuccess, newalbumsuccess, ROTATE_ALBUM_FOTO, rotatealbumfotosuccess } from "./albums.actions";
import { exhaustMap, map, merge, mergeAll, mergeMap } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IAlbumRequest } from "src/app/models/IAlbumRequest";
import { IDeleteStoreRequest, IGetAlbumFotoStoreRequest, IGetAlbumsRequestModel, IGetAlbumsStoreRequest, INewAlbumFotoStoreRequest, INewAlbumStoreRequest, IRotateAlbumFotoStoreRequest } from "./albums.model";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { baseGalleryPublicImageUrl } from "src/app/app.costant";
import { IFoto } from "src/app/models/IFoto";

@Injectable()
export class AlbumEffects {
  effects$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_ALBUMS),
      exhaustMap((action:IGetAlbumsStoreRequest) => {
        
        return this.galleryService.getAlbums(action.branca, action.anno, action.token).pipe(
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
      exhaustMap((action: IDeleteStoreRequest) => {
        return this.galleryService
          .deleteAlbum(action.data.idAlbum)
          .pipe(
            map((data) => {
              return deletealbumsuccess({ data: action.data });
            })
          );
      })
    )
  );

  effectsDeleteFoto$ = createEffect(() =>
    this.action$.pipe(
      ofType(DELETE_ALBUM_FOTO),
      exhaustMap((action: IDeleteStoreRequest) => {
        return this.galleryService
          .deleteFoto(action.data.idFoto!)
          .pipe(
            map((data) => {
              return deletealbumfotosuccess({ data: action.data });
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
                imgFolderUrl: baseGalleryPublicImageUrl + album.imgFolderUrl,
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
          .getFoto(action.data.idAlbum) 
          .pipe(
            map((album) => {
            
              var albumFoto: IAlbumFoto = {
                id: album.id,
                title: album.title,
                anno: album.anno,
                branca: album.branca,
                folder: album.folder,
                imgFolderUrl: baseGalleryPublicImageUrl + album.imgFolderUrl,
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
         
        return this.galleryService.uploadAlbumFoto(action.data.request).pipe(
          map((data) => {
          
            return newalbumfotosuccess({ photo: data });
          })
        );
      })
    )
  );
 
  effectsRotateFoto$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROTATE_ALBUM_FOTO),
      exhaustMap((action:IRotateAlbumFotoStoreRequest ) => {
        
        return this.galleryService.rotateFoto(action.data).pipe(
          map((ret) => {
            
            return rotatealbumfotosuccess({ data: ret });
          })
        );
      })
    )
  );
  
  constructor(
    private action$: Actions,
    private galleryService: GalleryService   
  ) {}
}