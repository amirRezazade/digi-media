import { apiKey ,genres, menu , manageMenu,moreFiltersToggle ,toggleMenu  ,switchTheme, getGenres , navControl} from './funcs.js'

document.querySelector('#search').addEventListener('click' ,  search)
const searchBoxSelection = document.querySelectorAll("#selection span");
searchBoxSelection.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    searchBoxSelection.forEach((el) => {
      el.classList.remove("bg-orange-400", "text-white");
    });
    e.target.classList.add("bg-orange-400", "text-white");
  });
});
menu.addEventListener("click", (e) => {
  if (e.target.id == "nav-menu") {
    manageMenu();
  }
});
window.addEventListener('scroll' ,()=>{
  navControl()

})
window.addEventListener('DOMContentLoaded' , ()=>{
  let theme = window.localStorage.getItem("theme");
  theme ? switchTheme(theme) : switchTheme("dark");
})

document.querySelector('#switch-theme').addEventListener('click' ,  switchTheme)
document.querySelectorAll('#manage-menu').forEach(elem=>{
  elem.addEventListener('click' , manageMenu)
})
document.querySelectorAll('#toggle-menu').forEach(elem=>{
  elem.addEventListener('click' ,e=>{
    toggleMenu(e.target)
    
  })
})

function search(){
    let mediaType 
     searchBoxSelection.forEach(elem=>{
        if(elem.classList.contains("bg-orange-400"))  mediaType = elem.dataset.type
        
    })
    let country = document.querySelector('#country').value
    let genre = document.querySelector('#genre').value
    let age = document.querySelector('#age').value
    let fromYear = Number(document.querySelector('#fromYear').value)
    let toYear = Number(document.querySelector('#toYear').value)
    let fromPoint = Number(document.querySelector('#fromPoint').value)
    let toPoint = Number(document.querySelector('#toPoint').value)
 console.log( `
  https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&with_genres=${genre}&with_origin_country=${country}&vote_average.gte=${fromPoint}&primary_release_year=${fromYear}&certification=${age}
`);
 
}