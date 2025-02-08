import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFoto } from 'src/app/models/IFoto';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  
  idAlbum:number = 0;
  photo$: Observable<IFoto[]> | undefined;

  constructor(private _service:GalleryService, private _route:ActivatedRoute ){
    
  }

  ngOnInit(): void {
    
    this.idAlbum  = +this._route.snapshot.paramMap.get('idAlbum')!;
    this.photo$   = this._service.getFoto(this.idAlbum);

     
  }

}
