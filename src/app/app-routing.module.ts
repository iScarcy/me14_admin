import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { FotoComponent } from './components/albums/foto/foto.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { UtilityComponent } from './components/utility/utility.component';
import { CensimentiComponent } from './components/censimenti/censimenti.component';
 
const routes: Routes = [
      {path:"", component: MainContentComponent},
      {path:"censimenti", component: CensimentiComponent},
      {path:"utility", component: UtilityComponent},
      {path:"utility/", component: UtilityComponent},
      {path:"gallery", component: AlbumsComponent},
      {path:"gallery/:branca", component: AlbumsComponent},
      {path:"gallery/photo/:album", component: FotoComponent},
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
