const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function () {
      const context = this; const
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // Select all the images
  const images = document.querySelectorAll('.slide-in');
  
  const checkSlide = () => {
    images.forEach((img) => {
      // slideInAt => how much scroll down in pixels at the middle of each
      // picture (half way through the image)
      // window.scrollY => how many pixels are scrolled down at the top of the window
      // window.innerHeight => height of the window
      const slideInAt = (window.scrollY + window.innerHeight) - img.height / 2;
  
      // imageBottom => how much scroll down in pixels at the end of each
      // picture (bottom of the image)
      // offsetTop is the distance from the top of the image to the top of the window
      const imageBottom = img.offsetTop + img.height;
  
      // Is the image half shown?
      const isHalfShown = slideInAt > img.offsetTop;
  
      // if we are not scrolled past it
      const isNotScrolledPast = window.scrollY < imageBottom;
  
      if (isHalfShown && isNotScrolledPast) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  };
  
  // Listen on the window
  window.addEventListener('scroll', debounce(checkSlide));
  