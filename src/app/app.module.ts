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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ILogin } from './models/ILogin';
import {  IAppStateModel, IAppStateInfoLogin } from './shared/store/Global/App.state';
import { localStorageSync, rehydrateApplicationState } from 'ngrx-store-localstorage';
import { LOGIN_SUCCESS } from './shared/store/Login/login.actions';
import { ErrorInterceptor } from './services/ErrorInterceptor';

const INIT_ACTION = "@ngrx/store/init";

export function localStorageSyncReducer(reducer: ActionReducer<IAppStateModel>): ActionReducer<IAppStateModel> {
  return function(state, action : any) {
    
 
    const keys = ['login','lastUpdate'];

    let clearErrOnIinit : boolean = false;
    if (action.type === INIT_ACTION){
     
     
      const rehydratedState = rehydrateApplicationState(keys, localStorage, k => k, true);
        
      if(rehydratedState.login.login.token=="err")
        clearErrOnIinit = true;
    }
 
    let xapp = localStorageSync({
      keys,
      rehydrate: true,
    })(reducer)(state, action);
   
    if(clearErrOnIinit)
      xapp.login.login.token = "";
    return xapp;
  };
}



export const metaReducers: MetaReducer<IAppStateModel, any>[] = [localStorageSyncReducer];
 
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
