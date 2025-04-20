import { apiKey , menu , manageMenu,moreFiltersToggle ,toggleMenu  ,switchTheme, getGenres , navControl} from './funcs.js'

console.log(apiKey);
document.querySelector('#switch-theme').addEventListener('click' ,  switchTheme)
document.querySelectorAll('#manage-menu').forEach(elem=>{
  elem.addEventListener('click' , manageMenu)
})
document.querySelectorAll('#toggle-menu').forEach(elem=>{
  elem.addEventListener('click' ,e=>{
    toggleMenu(e.target)
    
  })
})

function getHeaderInfo(){
  
}

// https://api.themoviedb.org/3/movie/1045938?api_key=cf30b054d9d7ec861b2a498d97eccdad&query&&language=fa&append_to_response=credits,videos