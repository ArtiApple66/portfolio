//font size depending on box size (about section) 
function aboutadjustfontsize() {
    const container = document.getElementById('text-container');
    const title = document.getElementById('title');
    const text = document.getElementById('text');
    const button = document.getElementById('buttonabout');

    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    const titleHeight = title.clientHeight;
    const buttonHeight = button.clientHeight;

    const availableHeight = containerHeight - titleHeight - buttonHeight - 40;

    text.style.overflow = 'visible';

    let fontSize = 200;
    const minFontSize = 12;

    while (fontSize >= minFontSize) {
        text.style.fontSize = `${fontSize}px`;

        if (text.scrollHeight <= availableHeight && text.scrollWidth <= containerWidth) {
            break;
        }

        fontSize--;
    }

    text.style.fontSize = `${fontSize}px`;
    text.style.overflow = 'hidden';
}

  function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }


  
  const debouncedAdjustFontSize = debounce(aboutadjustfontsize, 100);
  
  // Adjust font size on load, when window is resized, and when visibility changes
  document.addEventListener('DOMContentLoaded', debouncedAdjustFontSize);
  window.addEventListener('resize', debouncedAdjustFontSize);
  window.addEventListener('load', debouncedAdjustFontSize);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        aboutadjustfontsize();
    }
  });