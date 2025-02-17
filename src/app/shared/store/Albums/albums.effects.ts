import { GalleryService } from "src/app/services/gallery.service";
import { LOAD_ALBUMS, loadalbums, loadalbumssuccess } from "./albums.actions";
import { exhaustMap, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IAlbumRequest } from "src/app/models/IAlbumRequest";
import { IGetAlbumsRequestModel, IGetAlbumsStoreRequest } from "./albums.model";

@Injectable()
export class AlbumEffects {
  effects$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_ALBUMS),
      exhaustMap((action:IGetAlbumsStoreRequest) => {
       
        
        console.log(action.data.branca);
        debugger;
        return this.galleryService.getAlbums(action.data.branca).pipe(
          map((data) => {
            console.log(data);
            return loadalbumssuccess({ albums: data });
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