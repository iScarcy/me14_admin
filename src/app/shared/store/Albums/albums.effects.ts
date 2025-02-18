import { GalleryService } from "src/app/services/gallery.service";
import { DELETE_ALBUM, deletealbumsuccess, LOAD_ALBUMS, loadalbums, loadalbumssuccess, NEW_ALBUM, newalbumsuccess } from "./albums.actions";
import { exhaustMap, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IAlbumRequest } from "src/app/models/IAlbumRequest";
import { IDeleteAlbumStoreRequest, IGetAlbumsRequestModel, IGetAlbumsStoreRequest, INewAlbumStoreRequest } from "./albums.model";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { baseGalleryPublicImageUrl } from "src/app/app.costant";

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

  constructor(
    private action$: Actions,
    private galleryService: GalleryService   
  ) {}
}