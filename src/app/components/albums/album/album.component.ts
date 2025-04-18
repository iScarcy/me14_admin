import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IAlbum } from 'src/app/models/IAlbum';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { IAlbumFoto } from 'src/app/models/IAlbumFoto';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
import { Store } from '@ngrx/store';
import { FotoComponent } from '../foto/foto.component';
import { IDeleteRequestModel, IGetAlbumFotoRequestModel, INewAlbumFotoRequestModel, IRotateAlbumFotoRequestModel } from 'src/app/shared/store/Albums/albums.model';
import { deletealbumfoto, loadalbumfoto, newalbumfoto, rotatealbumfoto } from 'src/app/shared/store/Albums/albums.actions';
import { getalbum } from 'src/app/shared/store/Albums/albums.selectors';
import { NewAlbumComponent } from '../new-album/new-album.component';
import { IAlbumRequest } from 'src/app/services/rest/IAlbumRequest';
import { selectToken } from 'src/app/shared/store/Login/login.selectors';

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
    imgFolderUrl: '',
    foto: []
  };

  @Output() public deleteAlbumEmitter:EventEmitter<number> = new EventEmitter();
   

  ngOnInit(): void {
  
  }

  constructor(private _dialog: MatDialog,  private _store: Store<AppStateModel>){

  }


  //apertura dialog per eliminare album
  openDeleteConfirmDialog(id:number): void {
    
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {message: "Confermi di voler eliminare questo album ?", callback: () => this.delete(id)}    
    }
  
   
    let dialogRef = this._dialog.open(ConfirmComponent, config);
              
  }
 
  delete(id:number){
    this._dialog.closeAll();
    this.deleteAlbumEmitter.emit(id);
  }
 
  
  openEditAlbumDialog(albumfoto:IAlbumFoto){
    
      let config: MatDialogConfig = {
        panelClass: "dialog-responsive",
        disableClose: true,
        data: {titleDialog: "Modifica album", idAlbum:albumfoto.id, album:{idAlbum: albumfoto.id, anno: albumfoto.anno, title: albumfoto.title, branca: albumfoto.branca }, callback: (request:IAlbumRequest) => this.edit(request)} 
        
      }
      
      let dialogRed = this._dialog.open(NewAlbumComponent, config)
    }
 
   edit(album:IAlbumRequest){
    
    console.log("idAlbum:"+album.idAlbum) 
    console.log("anno:"+album.anno) 
    console.log("branca:"+album.branca) 
    console.log("title:"+album.title) 
  
   }
  
  
    //apertura Dialog per visualizzare le foto dell'album
    openDialogAlbumFoto(albumFoto:IAlbumFoto){
     
      const dialogExist = this._dialog.getDialogById('album-dialog');
  
      if(!dialogExist){
  
        let config: MatDialogConfig = {
          id:"album-dialog",
          panelClass: "dialog-responsive",
          disableClose: true,
          
          data: {album: albumFoto}       
        }
        
        let dialogRef = this._dialog.open(FotoComponent, config);
       
        
         
          const sub = dialogRef.componentInstance.onRotate.subscribe((data) => {
           
            const req:IRotateAlbumFotoRequestModel = {
              request: data
            }

            this._store.dispatch(rotatealbumfoto({data:req}) );
            this._store.select(getalbum(albumFoto.id)).subscribe({
              next: (data) =>{
                dialogRef.componentInstance.al = data!;
              }
            }); 
          })
          //end sub
          const subDelete = dialogRef.componentInstance.onDelete.subscribe((id) => {
            
            this._store.select(selectToken).subscribe((data) =>{
              if(data){
            
                  this._store.dispatch(deletealbumfoto({idAlbum: this.album.id,idFoto: id, token: data}));
                  
                  this._store.select(getalbum(albumFoto.id)).subscribe({
                    next: (data) =>{
                      dialogRef.componentInstance.al = data!;
                    }
                  }); 
            
              };
            //end token
            });
          })
          //end subDelete
          const subfoto = dialogRef.componentInstance.onUploadAlbumFoto.subscribe((data) => {
            const req:INewAlbumFotoRequestModel={
              request: data
            }
            
            this._store.dispatch(newalbumfoto({data:req}));
          
            this._store.select(getalbum(albumFoto.id)).subscribe({
              next: (data) =>{
                dialogRef.componentInstance.al = data!;
              }
            }); 
          })
          //end subfoto

      }
    }
     
    getAlbumFoto(albumFoto:IAlbumFoto){
        
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
          const sub = dialogRef.componentInstance.onRotate.subscribe((data) => {
            const req:IRotateAlbumFotoRequestModel = {
              request: data
            }

            this._store.dispatch(rotatealbumfoto({data:req}) );
            
            this._store.select(getalbum(albumFoto.id)).subscribe({
              next: (data) =>{
                dialogRef.componentInstance.al = data!;
              }
            }); 
          })
          //end sub
          const subDelete = dialogRef.componentInstance.onDelete.subscribe((id) => {
            
            this._store.select(selectToken).subscribe((data) =>{
              if(data){
                  this._store.dispatch(deletealbumfoto({idAlbum: this.album.id, idFoto: id, token: data}));
                  
                  this._store.select(getalbum(albumFoto.id)).subscribe({
                    next: (data) =>{
                      dialogRef.componentInstance.al = data!;
                    }
                  }); 
                  
                }
            }); 

          })
          //end subDelete
          const subfoto = dialogRef.componentInstance.onUploadAlbumFoto.subscribe((data) => {
            const req:INewAlbumFotoRequestModel={
              request: data
            }
            
            this._store.dispatch(newalbumfoto({data:req}));
          
            this._store.select(getalbum(albumFoto.id)).subscribe({
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
    

      this._store.select(selectToken).subscribe((data) =>{
          if(data){
            this._store.dispatch(loadalbumfoto({idAlbum:albumFoto.id, token: data }));
          }
      }); 
  
      const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
      buttonElement.blur(); // Remove focus from the button
      let x  = 0
      this._store.select(getalbum(albumFoto.id)).subscribe({
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
}
