import { createReducer, on } from "@ngrx/store";
import { deletealbumsuccess, loadalbumfotosuccess, loadalbumssuccess, newalbumsuccess } from "./albums.actions";
import { initialState } from "./albums.state";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";

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
       var item =  albumsFoto.find(item => item.id == action.album.id)!;
       var album : IAlbumFoto = {
           id: item.id,
           title: item.title,
           anno: item.anno,
           branca: item.branca,
           folder: item.folder,
           imgPathFolder: item.imgPathFolder,
           foto: []
       } 
       
        action.album.foto.forEach(element => {
            album.foto.push(element);
        }); ;
        let index = albumsFoto.indexOf(item)
        
        albumsFoto[index] = album;
        
        
        return {
            albums: albumsFoto
        }
    })
)

export function albumsReducer(state: any, action: any) {
    return _albumsReducer(state, action);
  }
 
 