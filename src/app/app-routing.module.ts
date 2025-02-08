import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlbumsComponent } from './components/albums/albums.component';
 
const routes: Routes = [
      {path:"gallery", component: GalleryComponent},
      {path:"gallery/:branca", component: AlbumsComponent},
      {path:"gallery/photo/:idAlbum", component: AlbumsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
