import { Component, OnInit, inject  } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAlbumComponent } from '../albums/new-album/new-album.component';
import { IAlbumRequest } from 'src/app/models/IAlbumRequest';

import { IAlbumsModel, IDeleteRequestModel, IGetAlbumFotoRequestModel, IGetAlbumsRequestModel, IGetAlbumsStoreRequest, INewAlbumFotoRequestModel, INewAlbumRequestModel } from 'src/app/shared/store/Albums/albums.model';
import { Store } from '@ngrx/store';
import { deletealbum, loadalbumfoto, loadalbums, newalbum, newalbumfoto } from 'src/app/shared/store/Albums/albums.actions';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
import { IAlbumFoto } from 'src/app/models/IAlbumFoto';
import { FotoComponent } from './foto/foto.component';
import { getalbum, getalbumslist } from 'src/app/shared/store/Albums/albums.selectors';
 
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  branca:string = "";
  
  albums$ = new Observable<IAlbumFoto[]> ();
  albumF : IAlbumFoto | undefined
  private readonly route = inject(ActivatedRoute);

  constructor(
    private _store: Store<AppStateModel>,
    private _dialog: MatDialog){

  }

  ngOnInit(): void {    
    
    this.branca  =  this.route.snapshot.paramMap.get('branca')!;

    const req:IGetAlbumsRequestModel={
      branca: this.branca
    }
 
    this._store.dispatch(loadalbums({data:req}));
    
    this.albums$ = this._store.select(getalbumslist); 
    
  }
   
  openNewAlbumDialog(){
  
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {album:{branca: this.branca}, callback: (request:IAlbumRequest) => this.new(request)} 
      
    }
    
    let dialogRed = this._dialog.open(NewAlbumComponent, config)
  }

  deleteAlbumListener(id:number){
    
    var req:IDeleteRequestModel={
      idAlbum: id,
      idFoto : undefined
      
    }
    
    this._store.dispatch(deletealbum({data: req}));
    
  }
 
  new(album:IAlbumRequest){
    var req: INewAlbumRequestModel = {
      request: album
    }

    this._store.dispatch(newalbum({data:req}));
    this._dialog.closeAll();
  }

  closeDialog(){
    this._dialog.closeAll();
  }
}
