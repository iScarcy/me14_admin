import { Component, Input, OnInit } from '@angular/core';
import { IUtility } from 'src/app/services/rest/IUtility';

@Component({
  selector: 'app-utility-item',
  templateUrl: './utility-item.component.html',
  styleUrls: ['./utility-item.component.css']
})
export class UtilityItemComponent implements OnInit {
  
  @Input() item:IUtility = {
    id: 0,
    name: '',
    fileFullPath: '',
    typeID: 0,
    type: ''
  }

  ngOnInit(): void {
      console.log(this.item.name);
  }

}
