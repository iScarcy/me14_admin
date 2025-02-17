import { GalleryService } from "src/app/services/gallery.service";
import { DELETE_ALBUM, deletealbumsuccess, LOAD_ALBUMS, loadalbums, loadalbumssuccess } from "./albums.actions";
import { exhaustMap, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IAlbumRequest } from "src/app/models/IAlbumRequest";
import { IDeleteAlbumStoreRequesst, IGetAlbumsRequestModel, IGetAlbumsStoreRequest } from "./albums.model";

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
      exhaustMap((action: IDeleteAlbumStoreRequesst) => {
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

  constructor(
    private action$: Actions,
    private galleryService: GalleryService   
  ) {}
}