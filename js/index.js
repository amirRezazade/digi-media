let menu = document.querySelector("#nav-menu");
menu.addEventListener("click", (e) => {
  if (e.target.id == "nav-menu") {
    manageMenu();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let theme = window.localStorage.getItem("theme");
  theme ? switchTheme(theme) : switchTheme("dark");
});
function manageMenu() {
  if (menu.style.right == "0px") {
    closeMenu();
  } else {
    openMenu();
  }
}
function closeMenu() {
  menu.style.right = "-120%";
}
function openMenu() {
  menu.style.right = "0";
}

function toggleMenu(el) {
  let h = el.parentElement.parentElement.scrollHeight;
  if (el.parentElement.parentElement.offsetHeight > 61) {
    el.parentElement.parentElement.style.height = "60px";
    el.style.transform = "rotate(0)";
  } else {
    el.parentElement.parentElement.style.height = h + "px";
    el.style.transform = "rotate(-90deg)";
  }
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
window.addEventListener('resize', ()=>{
})
  const swiper = new Swiper(".mySwiper", {
    // پارامترهای اصلی
    direction: "horizontal",
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    initialSlide: 0,
    speed: 500,
    spaceBetween: 30,
    effect: "slide",
    autoplay: {
      delay: 6000,
    },
    // grabCursor: false,
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    // ..................................
    breakpoints: {
      530: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        initialSlide: 0,     
      },
      650:{
        spaceBetween: 20,
        
      },
      768:{
        centeredSlides: true,
        
      }
    
   
    },
    

  
  });
