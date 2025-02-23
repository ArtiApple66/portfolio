// navigation
function toggleNav() {
    $("nav").toggleClass("active");
}

//cicle1 posision
function adjustCirclePosition() { 
  if (window.innerWidth > 600) {
    const headerContainer = document.querySelector('.header');
    const headerImg = document.querySelector('.headerimg');
    const circle1 = document.querySelector('.circle1');

    if (headerContainer && headerImg && circle1) {
      // Width of the headerContainer as reference
      const containerWidth = headerContainer.clientWidth;
      const imgWidth = headerImg.clientWidth;
      const circle1Width = circle1.offsetWidth;

      // Calculate the space available to the right of the image within the container
      const spaceToRightOfImage = containerWidth - imgWidth;

      // Padding you want to add on the left side of the circle
      const leftPadding = 20; 

      // Calculate new left position for the circle, subtracting the padding
      let newLeft = spaceToRightOfImage - (circle1Width / 2.3) - leftPadding;

      // Prevent the circle from moving too far to the left beyond the container's boundary
      newLeft = Math.max(newLeft, leftPadding);

      circle1.style.left = `${newLeft}px`;
    }
  } else {
    const headerContainer = document.querySelector('.header'); 
    const circle1 = document.querySelector('.circle1');

    if (headerContainer && circle1) {
      // Make only half of the circle visible on the right side of the screen
      const containerWidth = headerContainer.clientWidth;
      const circle1Width = circle1.offsetWidth;
      const circle1HalfVisible = containerWidth - (circle1Width / 1.4);

      circle1.style.left = `${circle1HalfVisible}px`;
    }
  }
}

//font size header
function adjustTextSizesAndPositions() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const header = document.querySelector('.header');
  const titlename = document.querySelector('span.titlename');
  const headertitle = document.querySelector('span.headertitle');
  const headersubtitle = document.querySelector('span.headersubtitle');
 

  // Base font sizes for each element
  const baseFontSizes = {
    titlename: 170,     // Base size as pixels  
    headertitle: 150,
    headersubtitle: 50
  };

  // Adjust font sizes uniformly based on the element with the largest width exceeding the viewport
  adjustFontSizesUniformly([titlename, headertitle, headersubtitle], viewportWidth, baseFontSizes);

  // Adjust vertical spacing based on viewport height
  positionElements(header, titlename, headertitle, headersubtitle);
}

function adjustFontSizesUniformly(elements) {
  const viewportWidth = window.innerWidth;
  const baseSizesVW = {
      titlename: 12,       // Base size as a percentage of viewport width
      headertitle: 10,
      headersubtitle: 3.3,
  };

  // Define a scaling factor for smaller screens
  const scaleFactor = viewportWidth < 600 ? 1.4 : 1; // Increase font sizes for 600 px

  elements.forEach(element => {
      const vwSize = baseSizesVW[element.className] * scaleFactor; // Apply scaling factor based on condition
      element.style.fontSize = `${vwSize}vw`;
      element.style.lineHeight = `${vwSize}vw`; 
  });

  console.log("Font sizes set based on viewport width.");
}

//position text header
function positionElements(header, titlename, headertitle, headersubtitle) {
    const fixedSpacing = 10;
    const buttonSpacing = 10;
  
    // Set titlename at the top of the header
    titlename.style.top = `${fixedSpacing}px`;
    titlename.style.margin = 0;
    titlename.style.padding = 0;
    titlename.style.verticalAlign = 'top';
    titlename.style.position = 'absolute';
  
    // Set headersubtitle just below titlename
    const subtitleTop = titlename.offsetHeight;
    headersubtitle.style.top = `${subtitleTop}px`;
    headersubtitle.style.position = 'absolute';
  
    // Calculate available height for headertitle after titlename and headersubtitle
    const availableHeight = header.offsetHeight - (titlename.offsetHeight + headersubtitle.offsetHeight + fixedSpacing);
  
    // Place headertitle below headersubtitle with dynamic spacing calculated
    headertitle.style.bottom = `${fixedSpacing}px`;
    headertitle.style.position = 'absolute';
    headertitle.style.marginTop = `${Math.max(10, availableHeight / 2)}px`; 
    

    // Adjust header styles based on viewport size dynamically
    if (window.innerHeight <= 300) {
      header.style.overflowY = 'hidden';
    } else {
      header.style.height = 'calc(100vh - (30px + 2vh))';
      header.style.overflowY = 'hidden';
    }
  }

  window.addEventListener('resize', () => {
    adjustCirclePosition();
    adjustTextSizesAndPositions();
    positionElements(document.querySelector('.header'), document.querySelector('span.titlename'), document.querySelector('span.headertitle'), document.querySelector('span.headersubtitle'));
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    adjustCirclePosition();
    adjustTextSizesAndPositions();
    positionElements(document.querySelector('.header'), document.querySelector('span.titlename'), document.querySelector('span.headertitle'), document.querySelector('span.headersubtitle'));
  });

//Animation circle2
document.addEventListener('DOMContentLoaded', function () {
  const circle1 = document.querySelector('.circle1');
  const circle2 = document.querySelector('.circle2');
  const header = document.getElementById('header');
  const about = document.getElementById('about');
  const initialLeft = 60; // Initial left percentage for circle1

  let lastScrollTop = 0; // To determine scroll direction

  function handleScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = header.offsetHeight;
    const aboutTop = about.offsetTop;

    // Determine the scroll direction
    let scrollDown = scrollPosition > lastScrollTop;

    // Manage circle1 behavior
    if (scrollPosition < headerHeight) {
      if (scrollDown) {
        const scrollFactor = scrollPosition / headerHeight;
        const newLeft = initialLeft + (100 - initialLeft) * scrollFactor;
        circle1.style.left = `${newLeft}%`;
      } else {
        // Adjust position when scrolling up, make it enter smoothly from the right
        if (scrollPosition === 0) {
          adjustCirclePosition();
        } else {
          const scrollFactor = (headerHeight - scrollPosition) / headerHeight;
          circle1.style.left = `${100 - (100 - initialLeft) * scrollFactor}%`;
        }
      }
    } else {
      circle1.style.left = '100%'; // Ensure it stays out of the screen on down scroll past header
    }

    // Manage circle2 appearance in the about section
    if (scrollPosition >= aboutTop - window.innerHeight && scrollPosition <= aboutTop + about.offsetHeight) {
      const entryFactor = (scrollPosition - (aboutTop - window.innerHeight)) / window.innerHeight;
      circle2.style.right = `${10 - (90 * (1 - entryFactor))}%`; // Slide in from the right
    } else {
      // Calculate exit factor when scrolling up
      if (!scrollDown && scrollPosition < aboutTop) {
        const exitFactor = (aboutTop - scrollPosition) / window.innerHeight;
        // Prevent the circle from moving too far right
        const newRight = Math.min(10, 10 - (90 * exitFactor));
        circle2.style.right = `${newRight}vmin`; // Adjust to not go beyond 10vmin from the right
      } else {
        circle2.style.right = `50%`;
      }
    }

    // Update the last scroll position
    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // For Mobile or negative scrolling
  }

  // Call the scroll handler on page load
  handleScroll();

  // Add the scroll event listener
  window.addEventListener('scroll', handleScroll);
});

/*
//shuffeling images to find best orientation
document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.image-grid');
  const images = Array.from(grid.querySelectorAll('.image-item'));  // Convert NodeList to Array for easier handling

  // Shuffle images using a simple shuffle algorithm (Fisher-Yates)
  for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap images[i] with images[j]
      [images[i], images[j]] = [images[j], images[i]];
  }

  // Append shuffled images back to the grid
  images.forEach(img => grid.appendChild(img));
});
*/

//font size depending on box size (about section) 
function aboutadjustfontsize() {
  const container = document.getElementById('text-container');
  const title = document.getElementById('title');
  const text = document.getElementById('text');
  const button = document.getElementById('button');

  const containerHeight = container.clientHeight;
  const containerWidth = container.clientWidth;

  // Get heights of the title and button
  const titleHeight = title.clientHeight;
  const buttonHeight = button.clientHeight;

  // Calculate the available height for the text
  const availableHeight = containerHeight - titleHeight - buttonHeight - 40; 

  // Set an initial font size
  text.style.fontSize = '15px';

  // Calculate the maximum font size where text still fits
  let fontSize = 15;
  const maxFontSize = 100; 

  while (fontSize < maxFontSize) {
      text.style.fontSize = `${fontSize}px`;

      // Check if text fits within the available space
      if (text.scrollHeight > availableHeight || text.scrollWidth > containerWidth) {
          break;
      }

      fontSize += 1;
  }

  // Reduce font size by 1 to ensure it fits
  text.style.fontSize = `${fontSize - 1}px`;
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

//send email button
function sendEmail() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const errorMessage = document.getElementById('error-message');

  if (name === "" || email === "" || message === "") {
      errorMessage.textContent = "Please fill in all fields.";
      errorMessage.style.display = "block";
      return;
  } else {
      errorMessage.style.display = "none";
  }

  const subject = encodeURIComponent('Your Subject');
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoLink = `mailto:elisavanklink@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
}
