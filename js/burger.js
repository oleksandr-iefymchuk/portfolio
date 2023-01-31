const headerNavbar = document.querySelector(".header-navbar");
const burgerMenu = document.querySelector(".burger-menu");
const burgerLine = document.querySelector(".menu-line");
const navLink = document.querySelectorAll(".nav-link");


const openBurgerMenu = () => {
    setTimeout(() => {
      headerNavbar.classList.toggle("_activ");
      burgerMenu.classList.toggle("_activ");
      burgerLine.classList.toggle("_activ");
    }, 300);
  }
  
  const closeBurgerMenu = () => {
    if (burgerMenu.classList.contains("_activ")) {
      setTimeout(() => {
        headerNavbar.classList.remove("_activ");
        burgerMenu.classList.remove("_activ");
        burgerLine.classList.remove("_activ");
      }, 1000);
    }
  }
  
  export {burgerMenu, navLink, openBurgerMenu, closeBurgerMenu}

