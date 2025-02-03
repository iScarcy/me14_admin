import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAlbumComponent } from '../albums/new-album/new-album.component';
 

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  constructor(private dialog: MatDialog){

  }

  openAlbumDialog(){
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true    
    }
    
    let dialogRed = this.dialog.open(NewAlbumComponent, config)
  }

  
}
