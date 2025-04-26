function aboutadjustfontsize() {
    const container = document.querySelector('.container');
    const title = document.querySelector('.title');
    const text = document.querySelector('.text');
    const button = document.querySelector('.buttonabout');

    if (!container || !title || !text || !button) return;

    // Reset font size first to get an accurate measurement
    text.style.fontSize = '15px';

    const containerHeight = container.clientHeight - 40;
    const titleHeight = title.clientHeight;
    const buttonHeight = button.clientHeight;

    const availableHeight = containerHeight - titleHeight - buttonHeight;
 
    let fontSize = 15;
    const maxFontSize = 100;

    console.log(containerHeight, titleHeight, buttonHeight)

    // Try increasing the font size until the text overflows
    while (fontSize < maxFontSize) {
        text.style.fontSize = `${fontSize}px`;

        // After setting font size, re-check if it overflows
        if (text.scrollHeight > availableHeight) {
            fontSize -= 1;
            break;
        }

        fontSize += 1;
        console.log(text.scrollHeight)
    }

    // Apply the best-fitting font size
    text.style.fontSize = `${fontSize}px`;
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