let menu = document.querySelector("#nav-menu");
menu.addEventListener('click' , e=>{    
    if(e.target.id=='nav-menu'){
        manageMenu()
    }
})
function manageMenu() {        
  if (menu.style.right == '0px') {
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
