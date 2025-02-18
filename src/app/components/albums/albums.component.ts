import { Component, OnInit, inject  } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { IAlbum } from 'src/app/models/IAlbum';
import { Branca } from 'src/app/models/Branca';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAlbumComponent } from '../albums/new-album/new-album.component';
import { IAlbumRequest } from 'src/app/models/IAlbumRequest';
import { IAlbumFoto } from 'src/app/models/IAlbumFoto';
import { IAlbumsModel, IDeleteAlbumRequestModel, IGetAlbumsRequestModel, IGetAlbumsStoreRequest } from 'src/app/shared/store/Albums/albums.model';
import { Store } from '@ngrx/store';
import { deletealbum, loadalbums } from 'src/app/shared/store/Albums/albums.actions';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  branca:string = "";
  
  albums$ = new Observable<IAlbumsModel> ();
  
  private readonly route = inject(ActivatedRoute);

  constructor(
    private _service:GalleryService, 
    private _store: Store<AppStateModel>,
    private _dialog: MatDialog){

  }

  ngOnInit(): void {    
    
    this.branca  =  this.route.snapshot.paramMap.get('branca')!;
  //  this.albums$ = this.fetchData();
    const req:IGetAlbumsRequestModel={
      branca: this.branca
    }
    this._store.dispatch(loadalbums({data:req}));
    
    this.albums$ = this._store.select("albums");
     console.log(this._store.select("albums"))
    
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
    console.log(id);
    var req:IDeleteAlbumRequestModel={
      id: id
    }
    this._store.dispatch(deletealbum({data: req}));
    /*

    this._service.deleteAlbum(id)
      .subscribe({
        complete: () => {
          this.albums$ = this.albums$!.pipe(
            map(albums => albums.filter(album => album.id !== id))
          )
        } 
      })

      */
  }

  new(request:IAlbumRequest){
   
    this._service.newAlbum(request).subscribe({
      /*next: (album) => {
        console.log("ciao::"+album);
        this.albums$!.pipe(
          tap(albums => albums.unshift(album))
        )
        console.log("_______ooooooo_______")
        this._dialog.closeAll();
        
      }*/
     complete:() => { 
      //this.albums$ = this.fetchData();
      this._dialog.closeAll();
        
      }
    });

    

  }

}
