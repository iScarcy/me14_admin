import { createReducer, on } from "@ngrx/store";
import { loadalbumssuccess } from "./albums.actions";
import { initialState } from "./albums.state";

const _albumsReducer = createReducer(
    initialState,
  
    on(loadalbumssuccess, (state,action)=>{
         return {
            albums: action.albums
        }
    })
)

export function albumsReducer(state: any, action: any) {
    return _albumsReducer(state, action);
  }
 
 