
import { IUtilityRequest } from "src/app/services/rest/IUtilityRequest";

export interface UtilityDialogData {
    titleDialog:string,
    title:string,
    FC_idUtilityType:number,
    
    callback: (request:IUtilityRequest) => void;
}