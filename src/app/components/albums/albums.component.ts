import { Component, OnInit, inject  } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAlbumComponent } from '../albums/new-album/new-album.component';
import { IAlbumRequest } from 'src/app/services/rest/IAlbumRequest';

import { IAlbumsModel, IDeleteRequestModel, IGetAlbumFotoRequestModel, IGetAlbumsRequestModel, IGetAlbumsStoreRequest, INewAlbumFotoRequestModel, INewAlbumRequestModel } from 'src/app/shared/store/Albums/albums.model';
import { Store } from '@ngrx/store';
import { deletealbum, loadalbumfoto, loadalbums, newalbum, newalbumfoto } from 'src/app/shared/store/Albums/albums.actions';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
import { IAlbumFoto } from 'src/app/models/IAlbumFoto';
import { FotoComponent } from './foto/foto.component';
import { getalbum, getalbumslist } from 'src/app/shared/store/Albums/albums.selectors';
import { selectToken } from 'src/app/shared/store/Login/login.selectors';
import { FormControl, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  branca:string = "";
  anno : string = "";

  albums$ = new Observable<IAlbumFoto[]> ();
  albumF : IAlbumFoto | undefined
  private readonly route = inject(ActivatedRoute);

  constructor(
    private _store: Store<AppStateModel>,
    private _dialog: MatDialog){

  }

  
  brancaSelected = '';
  ngOnInit(): void {    
        
  }
  
  onAnnoChange(event: any) {
    let anno:string = this.anno;
    let branca:string = this.brancaSelected;
    console.log(anno+"_"+anno.length);
    
        
    if(branca!=""){
      if(anno.length==4 || anno== ""){
        
          
          this.loadAlbums(branca, anno);
         
      }
    }
  }
  

  changeBranca(event: any):void{
    let anno:string = this.anno;
    let branca:string = this.brancaSelected;
    if(anno.length != 4 && (anno=="" || anno == null)){
      anno = "0"
    }
    
    if(branca!=null){
      
      switch(branca){
        case "lc":  this.branca = "L/C";
                    break;
        case "eg":  this.branca = "E/G";
                    break;
        case "rs": this.branca = "R/S";
                    break;            
        case "varie": this.branca = "Gruppo";
                    break;            
      }
      
      this.loadAlbums(branca, anno);
    }
    
  }

  loadAlbums(branca:string, anno: string){
   
    this._store.select(selectToken).subscribe((data) =>{
      if(data){
        const req:IGetAlbumsRequestModel={
          branca: this.branca
        }
    
        this._store.dispatch(loadalbums({branca: branca, anno: anno, token:data}));
        
        this.albums$ = this._store.select(getalbumslist);
      }
    }); 
  }
  openNewAlbumDialog():void{
  
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {titleDialog: "Aggiungi album", album:{branca: this.brancaSelected}, callback: (request:IAlbumRequest) => this.new(request)} 
      
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
    
    this._store.select(selectToken).subscribe((data) =>{
      if(data){
        const req:IGetAlbumsRequestModel={
          branca: this.branca
        }
    
        this._store.dispatch(newalbum({request: album, token:data}));
        
        this._dialog.closeAll();
      }

    });
  }

  closeDialog(){
    this._dialog.closeAll();
  }
}
