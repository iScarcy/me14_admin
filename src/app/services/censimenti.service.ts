import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { baseUsersApiUrl } from '../app.costant';
import { ICensito } from '../models/ICensito';

@Injectable({
  providedIn: 'root'
})
export class CensimentiService {

   constructor(private httpEvents: HttpClient) { }

    getCensiti():Observable<ICensito[]>{
   
      var url = baseUsersApiUrl+"Censiti";
 
      return this.httpEvents.get<Array<ICensito>>(url).pipe(
            map(censiti => censiti.map(user => ({
              
                  id: user.id,
                  codScout: user.codScout,
                  nome: user.nome,
                  cognome: user.cognome,
                  dataNascita: user.dataNascita, // ISO date string
                  mail: user.mail,
                  attivo: user.attivo,

                  luogoNascita: user.luogoNascita,
                  tel: user.tel,
                  cell: user.cell
            })))
          );
    }
}
