import { GalleryService } from "src/app/services/gallery.service";
import { LOAD_ALBUMS, loadalbums, loadalbumssuccess } from "./albums.actions";
import { exhaustMap, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class EventEffects {
  effects$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_ALBUMS),
      exhaustMap((action: string) => {
        return this.galleryService.getAlbums(action).pipe(
          map((data) => {
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