import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICensito } from 'src/app/models/ICensito';
import { CensimentiService } from 'src/app/services/censimenti.service';
import { CensitoDialogComponent } from './censito-dialog/censito-dialog.component';

@Component({
  selector: 'app-censimenti',
  templateUrl: './censimenti.component.html',
  styleUrls: ['./censimenti.component.css']
})
export class CensimentiComponent implements OnInit {
  
  censimenti:ICensito[] = [];

   constructor(private _service:CensimentiService,  private _dialog: MatDialog){}

  openAddCensitoDialog(): void {
    const dialogRef = this._dialog.open(CensitoDialogComponent, {
      width: '400px',
      data: {
        id: 0,
        codScout: '',
        nome: '',
        cognome: '',
        dataNascita: '',
        mail: '',
        attivo: false,
        luogoNascita: '',
        tel: '',
        cell: ''
      } as ICensito
    });
    dialogRef.afterClosed().subscribe((result: ICensito | undefined) => {
      if (result) {
        // Qui puoi aggiungere la logica per salvare il nuovo censito
        this.censimenti = [...this.censimenti, result];
      }
    });
  }
  
  ngOnInit(): void {
      this._service.getCensiti().subscribe((data) => {this.censimenti = data.sort((a, b) => a.cognome.localeCompare(b.cognome));});
  }
  

}
