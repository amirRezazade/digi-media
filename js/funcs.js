
let menu = document.querySelector("#nav-menu");
const apiKey = "cf30b054d9d7ec861b2a498d97eccdad&query";
const genres = {
  28: "اکشن",
  12: "ماجراجویی",
  16: "انیمیشن",
  35: "کمدی",
  80: "جنایی",
  99: "مستند",
  18: "درام",
  10751: "خانوادگی",
  14: "فانتزی",
  36: "تاریخی",
  27: "ترسناک",
  10402: "موزیکال",
  9648: "معمایی",
  10749: "عاشقانه",
  878: "علمی تخیلی",
  10770: "فیلم تلویزیونی",
  53: "هیجان انگیز",
  10752: "جنگی",
  37: "وسترن",
  10759: "اکشن و ماجراجویی",
  10762: "کودکان",
  10763: "اخبار",
  10764: "ریالیتی",
  10765: "علمی-تخیلی و فانتزی",
  10766: "سریال روزانه",
  10767: "تاک شو",
  10768: "جنگی و سیاسی"
};
let nav = document.querySelector('nav')


function manageMenu() {
    if (menu.style.right == "0px") {
      closeMenu();
    } else {
      openMenu();
    }
  }
  function closeMenu() {
    menu.style.right = "-120%";
    document.querySelector('#menu-text').innerHTML='منو'
  }
  function openMenu() {
    menu.style.right = "0";
    document.querySelector('#menu-text').innerHTML='<span  class="bg-orange-400 my-1.5 w-1.5 h-1.5 rounded-full"></span>'
  }
  function switchTheme(text) {
    let circle = document.querySelector("#switch-theme-circle");
    if (circle.classList.contains("translate-x-7.5") || text == "dark") {
      circle.classList.remove("translate-x-7.5");
      applyTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      circle.classList.add("translate-x-7.5");
      applyTheme("light");
      window.localStorage.setItem("theme", "light");
    }
  }
  function applyTheme(text) {
    if (text == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  function getGenres(el) {
    let slide = document.getElementById(el.id);
    el.genre_ids.forEach((e) => {
      let btn = `<button id="gen" data-id="${e}" class=" pointer-events-auto px-2.5 py-1 cursor-pointer rounded-full border text-xs hover:text-orange-400 hover:border-orange-400 transition-all duration-300">${genres[e]}</button>`;
      slide.querySelector(".genres").innerHTML += btn;
    });
    genreHref()
  }
  function genreHref(){
    document.querySelectorAll('#gen').forEach(elem=>{
      elem.addEventListener('click' , (e)=>{
        e.preventDefault();
        e.stopPropagation();
        window.location.href=`search.html?type=all&country=&age=&genre=${elem.dataset.id}&double=false&Subtitle=false&Online=false`    
      })
      
    })
    
    }
  
  function navControl(){
    if(window.innerWidth>1024){

      if(window.scrollY> 600){
        nav.style.transform='translateY(-50%)'
      }
      else{
        nav.style.transform=''
      }
    }
  }
  function toggleMenu(el) {
    let h = el.parentElement.parentElement.scrollHeight;
    if (el.parentElement.parentElement.offsetHeight > 61) {
      el.parentElement.parentElement.style.height = "60px";
    } else {
      el.parentElement.parentElement.style.height = h + "px";
    }
  }
  function moreFiltersToggle() {
    let elm = document.querySelector("#more-filters");
    if (
      elm.offsetHeight == elm.firstElementChild.nextElementSibling.offsetHeight
    ) {
      elm.style.height = elm.scrollHeight + "px";
    } else {
      elm.style.height =
        elm.firstElementChild.nextElementSibling.offsetHeight + "px";
    }
  }

  
export { apiKey,menu,genres , manageMenu  ,toggleMenu, switchTheme ,moreFiltersToggle, getGenres , navControl ,  }