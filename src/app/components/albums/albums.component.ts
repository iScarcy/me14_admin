import { Component, OnInit, inject  } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAlbum } from 'src/app/models/IAlbum';
import { Branca } from 'src/app/models/Branca';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  branca:string = "";

  albums$: Observable<IAlbum[]> | undefined;

  private readonly route = inject(ActivatedRoute);

  constructor(private _service:GalleryService){

  }

  ngOnInit(): void {    
    
    this.branca  =  this.route.snapshot.paramMap.get('branca')!;
    this.albums$ = this._service.getAlbums(this.branca);
    
  }



}
