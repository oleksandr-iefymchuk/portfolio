const preloader = document.querySelector('.preloader-wrapper');
const progressLine = document.querySelector('.progress-line');
const allImages = document.images;
let imgLoadedCount = 0;

const creatImages = () => {
  for(let i = 0; i < allImages.length; i++){
    const img = new Image();
    img.src = allImages[i].src;
      img.onload = imgLoad;
      img.onerror = imgLoad;
    }
  }

const imgLoad = () => {
  imgLoadedCount++;
  let persent = (100/allImages.length) * imgLoadedCount;
  progressLine.style.width = `${persent}%`;
  // if(imgLoadedCount >= allImages.length){
  //   loadData();
  // }
}

const loadData =  () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  })
  .then(() => {
    preloader.classList.add('_slow');
    setTimeout(function () {
      if (!preloader.classList.contains('_hidden')) {
        preloader.classList.add('_hidden');
      }
    }, 1000)});
  };

  export {preloader, loadData, creatImages}