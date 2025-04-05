import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { FotoComponent } from './components/albums/foto/foto.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
 
const routes: Routes = [
      {path:"", component: MainContentComponent},
      {path:"gallery", component: GalleryComponent},
      {path:"gallery/:branca", component: AlbumsComponent},
      {path:"gallery/photo/:album", component: FotoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
