
let menu = document.querySelector("#nav-menu");
menu.addEventListener("click", (e) => {
  if (e.target.id == "nav-menu") {
    manageMenu();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let theme = window.localStorage.getItem("theme");
  theme ? switchTheme(theme) : switchTheme('dark');
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
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // مقداردهی اولیه Swiper
  const mySwiper = new Swiper('.mySwiper', {
    // پارامترهای اصلی
    direction: 'horizontal',
    loop: true,
    speed: 800,
    effect: 'slide', // یا 'fade', 'cube', 'coverflow' و...
    grabCursor: true,
    slidesPerView: 2,
    
    // ماژول‌های فعال
    // modules: [Navigation, Pagination],
    
    // تنظیمات ناوبری
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // تنظیمات pagination
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    //   dynamicBullets: true,
    // },
    
    // تنظیمات واکنش‌گرایی
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
        
      },
    },
    
    // رویدادها
    on: {
      init: function() {
        console.log('Swiper initialized');
      },
      slideChange: function() {
        console.log('Slide changed to: ', this.activeIndex);
      },
    },
  });
  
  // دسترسی به نمونه Swiper در کنسول برای دیباگ
  window.mySwiper = mySwiper;
});