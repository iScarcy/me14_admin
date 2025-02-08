import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branca } from '../models/Branca';
import { map, Observable } from 'rxjs';
import { IAlbum } from '../models/IAlbum';
import { baseGalleryApiUrl, baseGalleryPublicImageUrl } from '../app.costant';
import { IUploadFile } from '../models/IUploadFile';
import { IFoto } from '../models/IFoto';

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
        fullPath: baseGalleryPublicImageUrl + album.anno + "/" + album.branca + "/" + album.folder + "/" + album.file,       
        status: album.status
      })))
    );
  }

  uploadAlbumImg(file: File):Observable<IUploadFile>{
    
    var url: string = baseGalleryApiUrl+"album/upload";
    const formData = new FormData();
    formData.append('file', file);

   return this.httpEvents.post<IUploadFile>(url, formData).pipe(
    map(data => ({file:  data.file}))
   )
  }

  getFoto(id:number):Observable<IFoto[]>{
    var url: string = baseGalleryApiUrl+"photo";
    return this.httpEvents.put<Array<IFoto>>(url,id).pipe(
      map(albums => albums.map(photo => ({
        id: photo.id,
        thumbPathFile: photo.thumbPathFile,
        mediumPathFile: photo.mediumPathFile
      })))
    );
  }

}
