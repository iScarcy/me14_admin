import { Component, Input, OnInit } from '@angular/core';
import { IAlbum } from 'src/app/models/IAlbum';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
  
  @Input() album:IAlbum = {
    id: 0,
    title: '',
    anno: 0,
    branca: "",
    folder: '',
    file: '',
    fullPath: '',
    status: false
  };

  ngOnInit(): void {
  
  }



}
