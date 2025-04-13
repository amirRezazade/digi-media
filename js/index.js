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

// document.addEventListener("DOMContentLoaded", function () {
  // مقداردهی اولیه Swiper
  const mySwiper = new Swiper(".mySwiper", {
    // پارامترهای اصلی
    direction: "horizontal",
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    initialSlide: 0,
    speed: 500,
    spaceBetween: 30,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 45,
      stretch: 50,
      depth: 20,
      modifier: 1,
      useTransform: true,
      slideShadows: false,
    },
    grabCursor: false,
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    on: {
      resize: function() {
        this.updateSlides();
        this.updateSlidesClasses();
        this.slideTo(this.activeIndex, 0);
      }
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    on: {
      resize: function() {
        this.update();
        this.slideTo(this.activeIndex, 0); // بازگشت به اسلاید فعلی بدون انیمیشن
      }
    },
    breakpoints: {
      530: {
        effect: "slide",
        slidesPerView: 'auto',
        spaceBetween: 10,
        initialSlide: 0,
        on: {
          resize: function() {
            this.slideTo(this.activeIndex, 0);
          }
        }
      },
      on: {
        breakpoint: function() {
          this.update();
        }
      }
   
    },
  });


  const resizeObserver = new ResizeObserver(() => {
    swiper.update();
    setTimeout(() => swiper.slideTo(swiper.activeIndex, 0), 100);
  });
  
  resizeObserver.observe(document.querySelector('.swiper'));