import '../index.html';
import '../scss/index.scss';

import {buttonSliderNext, sliderDots, sliderLine, wheelSlide, scrollDown, currentSlide, swipeStart, swipeAction, swipeEnd} from './slider'
import {animate, init} from './three'


window.addEventListener("wheel", wheelSlide);
buttonSliderNext.addEventListener("click", scrollDown);
sliderDots.addEventListener("click", currentSlide);
sliderLine.addEventListener('touchstart', swipeStart);
sliderLine.addEventListener('touchmove', swipeAction);
sliderLine.addEventListener('touchend', swipeEnd);

animate();
init();