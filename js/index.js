import '../index.html';
import '../scss/index.scss';


import {loadData, creatImages} from './preloader'
import {buttonSliderNext, burgerHeaders, dots, sliderLine, wheelSlide, scrollDown, currentSlide, swipeStart, swipeAction, swipeEnd} from './slider'
import {animate, init} from './three'
import {burgerMenu, navLink, openBurgerMenu, closeBurgerMenu} from './burger'

creatImages();
window.addEventListener("load", loadData);
window.addEventListener("wheel", wheelSlide);
buttonSliderNext.addEventListener("click", scrollDown);
dots.forEach((el) => el.addEventListener("click", currentSlide));
burgerHeaders.forEach((el) => el.addEventListener("click", currentSlide));
sliderLine.addEventListener('touchstart', swipeStart);
sliderLine.addEventListener('touchmove', swipeAction);
sliderLine.addEventListener('touchend', swipeEnd);

animate();
init();

burgerMenu.addEventListener("click", openBurgerMenu);
navLink.forEach((navHeaderItem) => {
  navHeaderItem.addEventListener("click", closeBurgerMenu);
});