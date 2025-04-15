import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { HttpClientModule } from '@angular/common/http';
import { AlbumComponent } from './components/albums/album/album.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewAlbumComponent } from './components/albums/new-album/new-album.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FotoComponent } from './components/albums/foto/foto.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { albumsReducer } from './shared/store/Albums/albums.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AlbumEffects } from './shared/store/Albums/albums.effects';
import { AppState } from './shared/store/Global/AppState.model';
import { LoginComponent } from './components/login/login.component';
import { LoginEffects } from './shared/store/Login/login.effects';

 // console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
 
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    MainContentComponent,
    GalleryComponent,
    AlbumsComponent,
    AlbumComponent,
    NewAlbumComponent,
    FotoComponent,
    ConfirmComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule, 
    StoreModule.forRoot(AppState, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AlbumEffects, LoginEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
