import { Component, OnInit } from '@angular/core';
import { IUtility } from 'src/app/services/rest/IUtility';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit{
 
  utility:IUtility[] = [];

  constructor(private _service:UtilityService){}
   
  ngOnInit(): void {
      this._service.getUtility().subscribe((data) => {this.utility = data.sort((a, b) => a.typeID - b.typeID);});
  }

}
