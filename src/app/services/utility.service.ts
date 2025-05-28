import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUtility } from './rest/IUtility';
import { baseUtilityApiUrl } from '../app.costant';
import { map, Observable } from 'rxjs';
import { IUploadFile } from '../models/IUploadFile';
import { IUtilityRequest } from './rest/IUtilityRequest';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

    constructor(private httpEvents: HttpClient) { }

    getUtility():Observable<IUtility[]>{

      var url = baseUtilityApiUrl;

       return this.httpEvents.get<Array<IUtility>>(url).pipe(
            map(utility => utility.map(item => ({
                  id:item.id,
                  name:item.name,
                  fileFullPath:item.fileFullPath,
                  typeID:item.typeID,
                  type:item.type
            })))
          );
    }

    uploadFile(file: File):Observable<IUploadFile>{
        
      var url: string = baseUtilityApiUrl+"upload";
      const formData = new FormData();
      formData.append('file', file);
  
      return this.httpEvents.post<IUploadFile>(url, formData).pipe(
      map(data => ({file:  data.file}))
      )
    }

    newUtility(request:IUtilityRequest){

       var url: string = baseUtilityApiUrl;
       this.httpEvents.post(url,request);

    }
}
