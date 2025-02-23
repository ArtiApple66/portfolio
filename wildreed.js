// navigation
function toggleNav() {
    $("nav").toggleClass("active");
}

//slides
let slideIndex = 1;
let slideTimeout;

showSlides(slideIndex);
startAutoSlides();

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetAutoSlides();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoSlides();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" actived", "");
    }
    slides[slideIndex-1].style.display = "flex";  
    dots[slideIndex-1].className += " actived";
}

function startAutoSlides() {
    slideTimeout = setTimeout(function() {
        showSlides(slideIndex += 1);
        startAutoSlides();
    }, 5000); // Change image every 3 seconds
}

function resetAutoSlides() {
    clearTimeout(slideTimeout);
    startAutoSlides();
}

//disapearing headertext
document.addEventListener('DOMContentLoaded', () => {
    const headerTextWrapper = document.querySelector('.headertext');
    
    // Add the animation class to trigger the slide in animation
    headerTextWrapper.classList.add('animate');
    
    // Remove the animation class after the animation completes
    setTimeout(() => {
        headerTextWrapper.classList.remove('animate');
        handleScroll(true); // Recalculate scroll position and opacity
    }, 1000); // Duration of the animation (1s)
});

function handleScroll(initialLoad = false) {
    var headerTextWrapper = document.querySelector('.headertext');
    var headerbutton = document.querySelector('.header-button');
    var aboutSection = document.querySelector('.about');
    var headerHeight = document.querySelector('.header').offsetHeight;
    var aboutSectionTop = aboutSection.getBoundingClientRect().top;

    // Temporarily disable transitions for the initial load
    if (initialLoad) {
        headerbutton.style.transition = 'none';
        headerTextWrapper.style.transition = 'none';
    }

    // Calculate the scroll percentage
    var scrollPercentage = Math.max(0, Math.min(1, aboutSectionTop / headerHeight));
    
    // Set the opacity based on the scroll percentage
    if (headerHeight < 400){
        threshold = headerHeight;
    } else {
        threshold = headerHeight - 400;
    }
    
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition < threshold) {
        headerbutton.style.opacity = scrollPercentage; // Show element
        headerTextWrapper.style.opacity = scrollPercentage;
    } else {
        headerbutton.style.opacity = '0'; 
        headerTextWrapper.style.opacity = '0';
    }

    // Restore transitions after the initial load
    if (initialLoad) {
        setTimeout(() => {
            headerbutton.style.transition = 'opacity 0.5s';
            headerTextWrapper.style.transition = 'opacity 0.5s';
        }, 0); // 0 ms delay to apply transition back after the current execution context
    }
}

// Run handleScroll on every scroll event
document.addEventListener('scroll', () => handleScroll());

// Run handleScroll immediately when the script is loaded for the initial load
handleScroll(true);


//font size
function aboutadjustfontsize() {
    const container = document.getElementById('text-container');
    const textab = document.getElementById('textab');
    const title = document.getElementById('title');
    const text = document.getElementById('text');

    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;

    const titleHeight = title.clientHeight;

    const availableHeight = containerHeight - titleHeight;

    let fontSize = 16;
    const minFontSize = 16;
    const maxFontSize = 100;

    text.style.fontSize = `${fontSize}px`;

    while (fontSize < maxFontSize) {
        text.style.fontSize = `${fontSize}px`;

        if (text.scrollHeight > availableHeight || text.scrollWidth > containerWidth) {
            break;
        }
        fontSize += 1;
    }

    fontSize -= 1;
    if (fontSize < minFontSize) {
        fontSize = minFontSize;
    }
    text.style.fontSize = `${fontSize}px`;

    if (fontSize === minFontSize) {
        const paddingVW = 5;
        const paddingPx = 2 * calculateVW(paddingVW);
        textab.style.height = `${text.scrollHeight + titleHeight + paddingPx}px`;
    } else {
        textab.style.height = '';
    }

    updateNewTextFontSize(fontSize);
}

function updateNewTextFontSize(fontSize) {
    const newText = document.getElementById('text2'); // New text section
    const newText2 = document.getElementById('text3');
    if (newText || newText2) {
        newText.style.fontSize = `${fontSize}px`;
        newText2.style.fontSize = `${fontSize}px`;
    }
}

function calculateVW(value) {
    return (window.innerWidth * value) / 100;
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const debouncedAdjustFontSize = debounce(handleAdjustFontSize, 200);

function handleAdjustFontSize() {
    // First call the adjust function immediately
    aboutadjustfontsize();
    // Then call it again after a short delay to ensure all rendering is done
    setTimeout(aboutadjustfontsize, 300);
}

document.addEventListener('DOMContentLoaded', handleAdjustFontSize);
window.addEventListener('resize', handleAdjustFontSize);
window.addEventListener('load', handleAdjustFontSize);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        handleAdjustFontSize();
    }
});

window.addEventListener('fullscreenchange', handleAdjustFontSize);
window.addEventListener('orientationchange', handleAdjustFontSize);
