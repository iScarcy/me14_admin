import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IAlbum } from 'src/app/models/IAlbum';
import { IUploadFile } from 'src/app/models/IUploadFile';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {


  constructor(
     @Inject(MAT_DIALOG_DATA) public data: IAlbum,
    private _service:GalleryService
  ){}
  ngOnInit(): void {
     
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
    if(this.FC_title.valid && this.FC_anno.valid && this.FC_branca.valid && this.display.valid){
      
      var fd = new FormData();
      this.file_list = [];
      for (let i = 0; i < this.file_store.length; i++) {
        fd.append("files", this.file_store[i], this.file_store[i].name);
        this.file_list.push(this.file_store[i].name);
      }

      
    }

    
  }
}
