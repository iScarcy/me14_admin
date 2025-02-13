import { Component, OnInit, inject  } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IAlbum } from 'src/app/models/IAlbum';
import { Branca } from 'src/app/models/Branca';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAlbumComponent } from '../albums/new-album/new-album.component';
import { IAlbumRequest } from 'src/app/models/IAlbumRequest';
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  branca:string = "";

  albums$: Observable<IAlbum[]> | undefined;
  
  private readonly route = inject(ActivatedRoute);

  constructor(private _service:GalleryService, private _dialog: MatDialog){

  }

  ngOnInit(): void {    
    
    this.branca  =  this.route.snapshot.paramMap.get('branca')!;
    this.albums$ = this._service.getAlbums(this.branca);
    
  }

  openNewAlbumDialog(){
   console.log("new");
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {album:{branca: this.branca}, callback: (request:IAlbumRequest) => this.new(request)} 
      
    }
    
    let dialogRed = this._dialog.open(NewAlbumComponent, config)
  }

  deleteAlbumListener(id:number){
   

    this._service.deleteAlbum(id)
      .subscribe({
        complete: () => {
          this.albums$ = this.albums$!.pipe(
            map(albums => albums.filter(album => album.id !== id))
          )
        } 
      })
  }

  new(request:IAlbumRequest){
     
    this._service.newAlbum(request).subscribe({
      next: (album) => {
       debugger;
       
        this.albums$!.pipe(
          map(albums => albums.push(album))
        )
        this._dialog.closeAll();
        
      }
    });

  }

}
