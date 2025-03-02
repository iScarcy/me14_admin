import { Component, OnInit, inject  } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAlbumComponent } from '../albums/new-album/new-album.component';
import { IAlbumRequest } from 'src/app/models/IAlbumRequest';

import { IAlbumsModel, IDeleteAlbumRequestModel, IGetAlbumFotoRequestModel, IGetAlbumsRequestModel, IGetAlbumsStoreRequest, INewAlbumFotoRequestModel, INewAlbumRequestModel } from 'src/app/shared/store/Albums/albums.model';
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
    
    var req:IDeleteAlbumRequestModel={
      id: id
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


/*   getAlbumFotoListener(albumFoto:IAlbumFoto){
    
      
    //controllo se ho già aperto le foto dell'album
    if(albumFoto.foto.length > 0){

      const dialogExist = this._dialog.getDialogById('album-dialog');

      if(!dialogExist){
  
        let config: MatDialogConfig = {
          id:"album-dialog",
          panelClass: "dialog-responsive",
          disableClose: true,
          
          data: {album: albumFoto}       
        }
        
    
        let dialogRef = this._dialog.open(FotoComponent, config)
        const sub = dialogRef.componentInstance.onRotate.subscribe(() => {
          console.log("ci siamo 2");
        })
        
      }
      
    }else{
       
      this.loadAlbumFotoFromStore(albumFoto);

    }  
 
  }

  loadAlbumFotoFromStore(albumFoto:IAlbumFoto){
   
    var req: IGetAlbumFotoRequestModel={
      album: albumFoto.folder
    }
    this._store.dispatch(loadalbumfoto({data:req}));
    
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
    let x  = 0
    this._store.select(getalbum(albumFoto.folder)).subscribe({
      next:(albumx)=>{console.log("next:"+albumx?.foto.length)
        
        if( x > 0 || (albumx?.foto.length!=undefined && albumx!.foto.length>0)){
          this.openDialogAlbumFoto(albumx!);         
        }
        else{
          console.log("ciaone");
          x++
          console.log(x)
        }
      },
      complete:()=>{console.log("complete")}
    });

  }

  openDialogAlbumFoto(albumFoto:IAlbumFoto){
    console.log("openDialogAlbumFoto(albumFoto:IAlbumFoto):"+albumFoto.foto.length)
    const dialogExist = this._dialog.getDialogById('album-dialog');

    if(!dialogExist){

      let config: MatDialogConfig = {
        id:"album-dialog",
        panelClass: "dialog-responsive",
        disableClose: true,
        
        data: {album: albumFoto}       
      }
      
     
      let dialogRef = this._dialog.open(FotoComponent, config)
      
       
        const sub = dialogRef.componentInstance.onRotate.subscribe(() => {
          console.log("ci siamo 1");
        })

        const subfoto = dialogRef.componentInstance.onUploadAlbumFoto.subscribe((data) => {
          const req:INewAlbumFotoRequestModel={
            request: data
          }
          //newalbumfoto=createAction(NEW_ALBUM_FOTO, props<{data: INewAlbumFotoRequestModel}>())
          this._store.dispatch(newalbumfoto({data:req}));
           
        })
    }
  } */

  closeDialog(){
    this._dialog.closeAll();
  }
}
