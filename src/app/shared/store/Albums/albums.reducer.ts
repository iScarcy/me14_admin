import { createReducer, on } from "@ngrx/store";
import { deletealbumsuccess, loadalbumfotosuccess, loadalbumssuccess, newalbumsuccess } from "./albums.actions";
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
            albums: state.albums.filter(album => album.id != action.data.id)  
        }
    }),
    on(newalbumsuccess, (state, action) => {
      
       var albumsNew = [...state.albums];
        albumsNew.unshift(action.album) 
        
        return {
            albums: albumsNew
        }
    }),
    on(loadalbumfotosuccess, (state,action)=>{
       
        var albumsFoto = [...state.albums];
        albumsFoto = albumsFoto.filter(album => album.id != action.album.id)  
        albumsFoto.unshift(action.album)
        return {
            albums: albumsFoto
        }
    })
)

export function albumsReducer(state: any, action: any) {
    return _albumsReducer(state, action);
  }
 
 