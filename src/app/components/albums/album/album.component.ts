import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IAlbum } from 'src/app/models/IAlbum';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { IAlbumFoto } from 'src/app/models/IAlbumFoto';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
import { Store } from '@ngrx/store';
import { FotoComponent } from '../foto/foto.component';
import { IDeleteRequestModel, IGetAlbumFotoRequestModel, INewAlbumFotoRequestModel } from 'src/app/shared/store/Albums/albums.model';
import { deletealbumfoto, loadalbumfoto, newalbumfoto } from 'src/app/shared/store/Albums/albums.actions';
import { getalbum } from 'src/app/shared/store/Albums/albums.selectors';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
  
  @Input() album:IAlbumFoto = {
    id: 0,
    title: '',
    anno: 0,
    branca: "",
    folder:'',
    imgPathFolder: '',
    foto: []
  };

  @Output() public deleteAlbumEmitter:EventEmitter<number> = new EventEmitter();
 

  ngOnInit(): void {
  
  }

  constructor(private _dialog: MatDialog,  private _store: Store<AppStateModel>){

  }

  delete(id:number){
    this._dialog.closeAll();
    this.deleteAlbumEmitter.emit(id);
  }

  getAlbumFoto(folder:string){
    console.log(folder);
    this.getAlbumFotoListener(this.album);
  }

  openDeleteConfirmDialog(id:number): void {
    
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {message: "Confermi di voler eliminare questo album ?", callback: () => this.delete(id)}    
    }
  
   
    let dialogRef = this._dialog.open(ConfirmComponent, config);
    
          
  }

   
    getAlbumFotoListener(albumFoto:IAlbumFoto){
      
        
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
            console.log("rotate");
          })
          //end sub
          const subDelete = dialogRef.componentInstance.onDelete.subscribe((id) => {
            
            const req:IDeleteRequestModel = {
              idAlbum: this.album.id,
              idFoto: id
            }
            
            this._store.dispatch(deletealbumfoto({data:req}));
            
            this._store.select(getalbum(albumFoto.folder)).subscribe({
              next: (data) =>{
                dialogRef.componentInstance.al = data!;
              }
            }); 
            
          })
          //end subDelete
          const subfoto = dialogRef.componentInstance.onUploadAlbumFoto.subscribe((data) => {
            const req:INewAlbumFotoRequestModel={
              request: data
            }
            
            this._store.dispatch(newalbumfoto({data:req}));
          
            this._store.select(getalbum(albumFoto.folder)).subscribe({
              next: (data) =>{
                dialogRef.componentInstance.al = data!;
              }
            }); 
          })
          //end subfoto
          
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
        
       
        let dialogRef = this._dialog.open(FotoComponent, config);
        
         
          const sub = dialogRef.componentInstance.onRotate.subscribe(() => {
            console.log("rotate");
          })
          //end sub
          const subDelete = dialogRef.componentInstance.onDelete.subscribe((id) => {
            
            const req:IDeleteRequestModel = {
              idAlbum: this.album.id,
              idFoto: id
            }
            
            this._store.dispatch(deletealbumfoto({data:req}));
            
            this._store.select(getalbum(albumFoto.folder)).subscribe({
              next: (data) =>{
                dialogRef.componentInstance.al = data!;
              }
            }); 
            
          })
          //end subDelete
          const subfoto = dialogRef.componentInstance.onUploadAlbumFoto.subscribe((data) => {
            const req:INewAlbumFotoRequestModel={
              request: data
            }
            
            this._store.dispatch(newalbumfoto({data:req}));
          
            this._store.select(getalbum(albumFoto.folder)).subscribe({
              next: (data) =>{
                dialogRef.componentInstance.al = data!;
              }
            }); 
          })
          //end subfoto

      }
    }
     
}
