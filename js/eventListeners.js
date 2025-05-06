
import { apiKey ,genres, menu , manageMenu,moreFiltersToggle ,toggleMenu  ,switchTheme, getGenres , navControl} from './funcs.js'


window.addEventListener('load' ,()=>{
  document.querySelector('.loader-wrapper').remove()
  document.querySelector('.content').classList.remove('hidden')
})
menu.addEventListener("click", (e) => {
    if (e.target.id == "nav-menu") {
      manageMenu();
    }
  });
  window.addEventListener('scroll' ,()=>{
        navControl()
  })
  window.addEventListener('resize' ,()=>{
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
document.querySelector('#more-filters-toggle').addEventListener('click' ,  moreFiltersToggle)
document.querySelectorAll('#toggle-menu').forEach(elem=>{
    elem.addEventListener('click' ,e=>{
      toggleMenu(e.target)
      
    })
  })
  const searchBoxSelection = document.querySelectorAll("#selection span");
searchBoxSelection.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    searchBoxSelection.forEach((el) => {
      el.classList.remove("bg-orange-400", "text-white");
    });
    e.target.classList.add("bg-orange-400", "text-white");
  });
});

document.querySelector('#search').addEventListener('click' ,  ()=>{  
  let mediaType ;
  searchBoxSelection.forEach(elem=>{
     if(elem.classList.contains("bg-orange-400"))  mediaType = elem.dataset.type
 })
 let country =document.querySelector('#country').value
 let genre =document.querySelector('#genre').value
 let fromYear =Number(document.querySelector('#fromYear').value)
 let toYear =Number(document.querySelector('#toYear').value)
 let fromPoint =document.querySelector('#fromPoint').value
 let toPoint =document.querySelector('#toPoint').value
 let age =document.querySelector('#age').value
 let  double=document.querySelector('#double').checked
 let  Subtitle=document.querySelector('#Subtitle').checked
 let sort= document.querySelector('#sort').value
 window.location.href= `search.html?${'&type='+mediaType}${'&country='+country}${'&genre='+genre}${'&fromYear='+fromYear}${'&toYear='+toYear}${'&fromPoint='+fromPoint}${'&toPoint='+toPoint}${'&age='+age}${'&double='+double}${'&Subtitle='+Subtitle}${'&page=1'}${sort=='' ?'' : '&sort='+ sort}`
})

let navInput= document.querySelector('#navbar-input')
let navSearch= document.querySelector('#navbar-search')
navSearch.addEventListener('click' , ()=>{
  let value = navInput.value.trim()
  window.location.href=`search.html?name=${value}`
})
navInput.addEventListener('keyup' ,  e=>{  
  let value = navInput.value.trim()
  if(e.keyCode==13) {
   window.location.href=`search.html?name=${value}`
 }
})