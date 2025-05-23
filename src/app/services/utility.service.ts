import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUtility } from './rest/IUtility';
import { baseUtilityApiUrl } from '../app.costant';
import { map, Observable } from 'rxjs';

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
}
