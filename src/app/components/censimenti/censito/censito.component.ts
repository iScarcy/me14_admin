import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICensito } from 'src/app/models/ICensito';

@Component({
  selector: 'app-censito',
  templateUrl: './censito.component.html',
  styleUrls: ['./censito.component.css']
})
export class CensitoComponent   {
  
  
 

    @Input() item:ICensito = {
      id: 0,
      codScout: '',
      nome: '',
      cognome: '',
      dataNascita: '',
      mail: '',
      attivo: false
    }

    @Output() public editUtilityEmitter:EventEmitter<ICensito> = new EventEmitter();
    @Output() public deleteUtilityEmitter:EventEmitter<number> = new EventEmitter();
      
     
      editUtility(utility:ICensito){
        this.editUtilityEmitter.emit(utility);
      }
    
      
    
      deleteUtility(id:number){
         this.deleteUtilityEmitter.emit(id);
      }
    

}
