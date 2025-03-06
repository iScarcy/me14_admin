import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlbumDialogData } from 'src/app/models/dialog/AlbumDialogData';
import { IAlbum } from 'src/app/models/IAlbum';
import { IAlbumRequest } from 'src/app/models/IAlbumRequest';
import { IUploadFile } from 'src/app/models/IUploadFile';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {


  constructor(
     @Inject(MAT_DIALOG_DATA) public data: AlbumDialogData,
    private _service:GalleryService
  ){}

  ngOnInit(): void {
     this.FC_title.setValue(this.data.album.title)
     this.FC_anno.setValue(""+this.data.album.anno)
     this.FC_branca.setValue(this.data.album.branca)
  }

  
  
  FC_title = new FormControl('',[
    Validators.required
  ])
 
  FC_anno = new FormControl('',[
    Validators.required
  ])

  FC_branca = new FormControl('',[
    Validators.required
  ])

  display: FormControl = new FormControl("", Validators.required);
  file_store!: FileList;
  file_list: Array<string> = [];
  

  handleFileInputChange(l: FileList ): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      console.log(f);
    
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      
      this._service.uploadAlbumImg(f).subscribe((data) =>{
          this.display.patchValue(data.file);        
      });

    } else {
      this.display.patchValue("");
    }

    

  }

  handleSubmit(): void {
    debugger;
    if(this.FC_title.valid && this.FC_anno.valid && this.FC_branca.valid && (this.display.valid || (this.display.valid==false && this.data.album.idAlbum!=undefined))){
      
      const idAlbum : number = 0;

      var albumRequest : IAlbumRequest = {
        idAlbum: this.data.album.idAlbum,
        anno:  +this.FC_anno.value!,
        title: this.FC_title.value!,
        branca: this.FC_branca.value!,
        copertina: this.display.value 
      } 
   


      this.data.callback(albumRequest);
      
    }

    
  }
}
