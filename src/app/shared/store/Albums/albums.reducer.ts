import { createReducer, on } from "@ngrx/store";
import { deletealbumfotosuccess, deletealbumsuccess, editalbumsuccess, loadalbumfotosuccess, loadalbumssuccess, newalbumfotosuccess, newalbumsuccess, rotatealbumfotosuccess } from "./albums.actions";
import { initialState } from "./albums.state";
import { IAlbumFoto } from "src/app/models/IAlbumFoto";
import { IFoto } from "src/app/models/IFoto";

const _albumsReducer = createReducer(
    initialState,
  
    on(loadalbumssuccess, (state,action)=>{
       
        return {
            albums: action.albums
        }
    }),
    on(deletealbumsuccess, (state, action) => {
        return {
            albums: state.albums.filter(album => album.id != action.data.idAlbum)  
        }
    }),
    on(newalbumsuccess, (state, action) => {
      
       var albumsNew = [...state.albums];
        albumsNew.unshift(action.album) 
        
        return {
            albums: albumsNew
        }
    }),
    on(editalbumsuccess, (state, action) => {
        
        var albumsFoto = [...state.albums];
        var item =  albumsFoto.find(item => item.id == action.album.id)!;
        
        var album : IAlbumFoto = {
            id: item.id,
            title: item.title,
            anno: item.anno,
            branca: item.branca,
          //  folder: item.folder,
            imgFolderUrl: item.imgFolderUrl,
            foto: item.foto
        } 
       
        let index = albumsFoto.indexOf(item)
        
        albumsFoto[index] = album;


        return {
            albums: albumsFoto
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
           imgFolderUrl: item.imgFolderUrl,
           foto: []
       } 
       
        action.album.foto.forEach(element => {
            const ph:IFoto = {
                id: element.id,
                albumID: element.albumID,
                file: element.file,
                thumbPathFile: element.thumbPathFile +  "?t="+ Math.random() ,
                fullPathFile: element.fullPathFile
            }
            
            album.foto.push(ph);
        }); 
        let index = albumsFoto.indexOf(item)
        
        albumsFoto[index] = album;
                
        return {
            albums: albumsFoto
        }
    }),
    on(newalbumfotosuccess, (state, action)=>{
       
        var albumsFoto = [...state.albums];
        var item =  albumsFoto.find(item => item.id == action.photo[0].albumID)!;
        
        var album : IAlbumFoto = {
            id: item.id,
            title: item.title,
            anno: item.anno,
            branca: item.branca,
          //  folder: item.folder,
            imgFolderUrl: item.imgFolderUrl,
            foto: []
        } 

        item.foto.forEach(element => {
            album.foto.push(element);
        });

        action.photo.forEach(element => {
            album.foto.push(element);
        }); 
        let index = albumsFoto.indexOf(item)
        
        albumsFoto[index] = album;

        return {
            albums: albumsFoto
        }
    }),
    on(deletealbumfotosuccess, (state, action) => {
      
        var albumsFoto = [...state.albums];
        var item =  albumsFoto.find(item => item.id == action.data.idAlbum)!;
        
        var album : IAlbumFoto = {
            id: item.id,
            title: item.title,
            anno: item.anno,
            branca: item.branca,
          //  folder: item.folder,
            imgFolderUrl: item.imgFolderUrl,
            foto: item.foto.filter(f => f.id != action.data.idFoto)
        } 
       
        let index = albumsFoto.indexOf(item)
        
        albumsFoto[index] = album;


        return {
            albums: albumsFoto
        }
    }),
    on(rotatealbumfotosuccess, (state, action) => {
      
        var albumsFoto = [...state.albums];
        var item =  albumsFoto.find(item => item.id == action.data )!;
        var album : IAlbumFoto = {
            id: item.id,
            title: item.title,
            anno: item.anno,
            branca: item.branca,
          //  folder: item.folder,
            imgFolderUrl: item.imgFolderUrl,
            foto: []
        } 
        
         item.foto.forEach(element => {
             const ph:IFoto = {
                 id: element.id,
                 albumID: element.albumID,
                 file: element.file,
                 thumbPathFile: element.thumbPathFile +  "?t="+ Math.random() ,
                 fullPathFile: element.fullPathFile
             }
             
             album.foto.push(ph);
         }); 
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
 
 