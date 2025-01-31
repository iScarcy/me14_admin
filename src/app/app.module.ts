import { NgModule } from '@angular/core';
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
 
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    MainContentComponent,
    GalleryComponent,
    AlbumsComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
