import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branca } from '../models/Branca';
import { map, Observable } from 'rxjs';
import { IAlbum } from '../models/IAlbum';
import { baseGalleryApiUrl, baseGalleryPublicImageUrl } from '../app.costant';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpEvents: HttpClient) { }

  getAlbums(branca: string | null):Observable<IAlbum[]>{
  
   var url: string = baseGalleryApiUrl+"albums/"+branca;
    return this.httpEvents.get<Array<IAlbum>>(url).pipe(
      map(albums => albums.map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca,
        folder: album.folder,
        file: album.file,
        data: album.data,        
        fullPath: baseGalleryPublicImageUrl + album.anno + "/" + album.branca + "/" + album.folder + "/" + album.file,       
        status: album.status
      })))
    );
  }
}
