import { albumsReducer } from "../Albums/albums.reducer";
import { loginReducer } from "../Login/login.reducer";
 
export const AppState = {
    albums:albumsReducer,
    login:loginReducer
}