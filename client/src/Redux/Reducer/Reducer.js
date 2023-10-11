import { FILTER, GET_GENRES, GET_VG_NAME, GET_VIDEOGAMES, ORDER, PAGINATE } from "../Actions/action-types";


const initialState = {
  allVideoGames: [],
  allGenres: [],
  allVideoGamesBackup:[],
  currentPage:0,
  videoGamesFiltered: [],
  filter: false
};

const reducer = (state = initialState, { type, payload }) => {
  const ITEMS_PER_PAGE = 15;
  switch (type) {
    case GET_GENRES:
        return {
          ...state,
          allGenres: payload
        }
      break;
      case GET_VIDEOGAMES:
        return {
          ...state,
          allVideoGames: [...payload].splice(0,ITEMS_PER_PAGE),
          allVideoGamesBackup: payload
        }
      break;
      case PAGINATE:
        const nextPage = state.currentPage + 1;
        const prevPage = state.currentPage - 1;
        const firstIndex = payload === "next"? nextPage * ITEMS_PER_PAGE: prevPage * ITEMS_PER_PAGE;
        
        if(state.filter){
          if (payload === "next" && firstIndex >= state.videoGamesFiltered.length) return state;     
          else if(payload === "prev" && prevPage < 0 ) return state;
          return {
            ...state,
            allVideoGames: [...state.videoGamesFiltered].splice(firstIndex,ITEMS_PER_PAGE ),
            currentPage: payload === "next" ?nextPage: prevPage
          }
        }

        if (payload === "next" && firstIndex >= state.allVideoGamesBackup.length) return state;     
        else if(payload === "prev" && prevPage < 0 ) return state;

        return {
          ...state,
          allVideoGames: [...state.allVideoGamesBackup].splice(firstIndex,ITEMS_PER_PAGE ),
          currentPage: payload === "next" ?nextPage: prevPage
        }

      break;
      case GET_VG_NAME:
        return {
          ...state,
          allVideoGames: payload,
        }
      break;
      case FILTER:
        const filterByGenres = [...state.allVideoGamesBackup].filter((vg)=>vg.genres.includes(payload))
        
        return{
          ...state,
          allVideoGames: filterByGenres.splice(0,ITEMS_PER_PAGE),
          videoGamesFiltered: filterByGenres,
          filter: true
        }
      break
      case ORDER:

        let filteract = state.filter;
        let  orderByGenres = [];
        if (filteract) {
          if (payload === 'A') {
            orderByGenres = [...state.allVideoGames].sort((a,b) =>{
              if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
              if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
              return 0;
            })
          }
          else if(payload === 'Z'){
              orderByGenres = [...state.allVideoGames].sort((a,b) =>{
              if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
              if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
              return 0;
            })
          }
        }
        else{
        
        if (payload === 'A') {
          orderByGenres = [...state.allVideoGamesBackup].sort((a,b) =>{
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
            return 0;
          })
        }
        else if(payload === 'Z'){
            orderByGenres = [...state.allVideoGamesBackup].sort((a,b) =>{
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
            return 0;
          })
        }
      }
      
      if (payload === '-') {
        state.filter = false;
        if (payload === 'A') {
          orderByGenres = [...state.allVideoGamesBackup].sort((a,b) =>{
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
            return 0;
          })
        }
        else if(payload === 'Z'){
            orderByGenres = [...state.allVideoGamesBackup].sort((a,b) =>{
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
            return 0;
          })
        }
      }
      
        
        
        return{
          ...state,
          allVideoGames: [...orderByGenres].splice(0,ITEMS_PER_PAGE),
          videoGamesFiltered: orderByGenres,
          
        }
      break
  
    default: return state
      break;
  }
};

export default reducer;
