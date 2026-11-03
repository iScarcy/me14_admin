
import { IUtilityRequest } from "src/app/services/rest/IUtilityRequest";

export interface UtilityDialogData {
    id: number | null,
    titleDialog:string,
    title:string,
    FC_idUtilityType:number,
    
    callback: (request:IUtilityRequest) => void;
}