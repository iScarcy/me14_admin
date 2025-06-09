import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityDialogData } from 'src/app/models/dialog/UtilityDialogData';
import { IUtilityRequest } from 'src/app/services/rest/IUtilityRequest';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-utility-dialog',
  templateUrl: './utility-dialog.component.html',
  styleUrls: ['./utility-dialog.component.css']
})
export class UtilityDialogComponent implements OnInit{
  
    constructor(
       @Inject(MAT_DIALOG_DATA) public data: UtilityDialogData,
        private _service:UtilityService
    ){}

  ngOnInit(): void {
      console.log(this.data)
      this.FC_title.setValue(this.data.title);
      this.FC_idUtilityType.setValue(""+this.data.FC_idUtilityType)
  }

  
 
    FC_title = new FormControl('',[
      Validators.required
    ])
   
    FC_idUtilityType = new FormControl('', [
       Validators.required
    ])
  
    display: FormControl = new FormControl("", Validators.required);
    file_store!: FileList;
    file_list: Array<string> = [];
    
    
    handleFileInputChange(l: FileList ): void {
      this.file_store = l;
      if (l.length) {
        const f = l[0];
        console.log(f);
      
        const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
        
        this._service.uploadFile(f).subscribe((data) =>{
            this.display.patchValue(data.file);        
        });
  
      } else {
        this.display.patchValue("");
      }
  
      
  
    }
   
    handleSubmit(): void {
     
      if(this.FC_title.valid && this.FC_idUtilityType.valid && (this.display.valid || (this.display.valid==false ))){
        
                 
        var request : IUtilityRequest = {
          id: this.data.id,
          title: this.FC_title.value!,
          filename:  this.display.value ,
          type:  +this.FC_idUtilityType.value!
        } 
     
  
        this.data.callback(request);
        
      }
  
      
    }
 
}
