const sliderLine = document.querySelector(".slider-line");
const slides = document.querySelectorAll(".slide");
const buttonSliderNext = document.querySelector(".button-slider-next");
const dots = document.querySelectorAll(".slider-dots_item");
const sliderDots = document.querySelector(".slider-dots");
let count = 0;
let isMoving = false;
let posInit = 0;
let posY1 = 0;
let posY2 = 0;
const regExp = /([-0-9.]+(?=vh))/;
sliderLine.style.transform = 'translateY(0vh)';


const letMove = () => {
  isMoving = true;
  setTimeout(function () {
    isMoving = false;
  }, 1000);
};

const moveSlide = () => {
  sliderLine.style.transform = `translateY(-${count*100}vh)`;
  buttonSliderNext.classList.add("stop-anim");
  dots.forEach((el) => el.classList.remove("active"));
  dots[count].classList.add("active");
};

const scrollDown = () => {
  count++;
  if (count >= slides.length) {
    count = 0;
  }
  moveSlide();
};

const scrollUp = () => {
  count--;
  if (count < 0) {
    count = slides.length - 1;
  }
  moveSlide();
};

const wheelSlide = (e) => {
  if (e.deltaY > 0) {
    if (isMoving) return;
    letMove();
    scrollDown();
  } else if (e.deltaY < 0) {
    if (isMoving) return;
    letMove();
    scrollUp();
  }
};

const currentSlide = (e) => {
  dots.forEach((dot) => dot.classList.remove("active"));
  e.target.classList.add("active");
  for (let i = 0; i < dots.length; i++) {
    dots[i].setAttribute("count", i);
  }
  let dot = e.target.getAttribute("count");
  moveSlide((count = dot));
};

const swipeStart = (e) => {
  posInit = posY1 = e.touches[0].clientY;
};

const swipeAction = (e) => {
  // let style = sliderLine.style.transform;
  // let transform = +style.match(regExp)[0];
  // posY2 = posY1 - e.touches[0].clientY;
  posY1 = e.touches[0].clientY; 
  // sliderLine.style.transform = `translateY(${transform - posY2*0.5}vh)`;
};

const swipeEnd = (e) => {
  if (posInit > posY1) {
    scrollDown();
  } else if (posInit < posY1) {
    scrollUp();
  }
}

export {buttonSliderNext, sliderDots, sliderLine, wheelSlide, scrollDown, currentSlide, swipeStart, swipeAction, swipeEnd}
