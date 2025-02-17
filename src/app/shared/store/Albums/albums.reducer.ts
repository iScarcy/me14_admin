import { createReducer, on } from "@ngrx/store";
import { deletealbumsuccess, loadalbumssuccess } from "./albums.actions";
import { initialState } from "./albums.state";

const _albumsReducer = createReducer(
    initialState,
  
    on(loadalbumssuccess, (state,action)=>{
       
        return {
            albums: action.albums
        }
    }),
    on(deletealbumsuccess, (state, action) => {
        return {
            albums: state.albums.filter(album => album.id != action.data.id)  //albums.filter(album => album.id !== id))
        }
    })
)

export function albumsReducer(state: any, action: any) {
    return _albumsReducer(state, action);
  }
 
 