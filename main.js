/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
// JavaScript to toggle dark mode
document.querySelector('.switch__input').addEventListener('change', function() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');

  // Save preference to local storage
  localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
});

// Check local storage for dark mode preference
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
  document.querySelector('.switch__input').checked = true;
}


(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

function showServiceDetail(serviceId) {
  // Remove 'active' class from all links
  const links = document.querySelectorAll('.services-list a');
  links.forEach(link => link.classList.remove('active'));

  // Add 'active' class to the clicked link
  const activeLink = Array.from(links).find(link => link.textContent.trim() === serviceId);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Hide all service detail sections
  const allServices = document.querySelectorAll('.service-detail');
  allServices.forEach(service => {
    service.style.display = 'none';
  });

  // Show the clicked service detail
  const selectedService = document.getElementById(serviceId);
  if (selectedService) {
    selectedService.style.display = 'block';
  }
}



function sendMessage() {
  const phoneNumber = '+2349090777564'; // Replace with the recipient's WhatsApp number
  const message = encodeURIComponent('Hello, I need help!'); // Replace with your desired message
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappURL, '_blank');
}

// Function to handle the visibility of the text based on screen width
function checkScreenSize() {
  const span = document.querySelector('.wh'); // Select the span with text
  const button = document.querySelector('.whatsapp-button'); // Select the button

  if (window.innerWidth <= 480) {
      span.style.display = 'none'; // Initially hide the text on mobile
      button.classList.remove('show-text'); // Hide text if mobile
  } else {
      span.style.display = 'inline'; // Show text on larger screens
      button.classList.add('show-text'); // Show text animation if larger screen
  }
}

// Run checkScreenSize when the page loads
window.onload = checkScreenSize;

// Add event listener to update on window resize
window.onresize = checkScreenSize;

// Add event listener to toggle text visibility
const whatsappButton = document.getElementById('whatsappButton');
whatsappButton.addEventListener('click', function () {
  const button = document.querySelector('.whatsapp-button');
  button.classList.toggle('show-text');
}); 









// Function to start the sliding animation on mobile
function startTextAnimation() {
  const textContainer = document.getElementById('whatsappText');
  setInterval(() => {
      textContainer.classList.add('show');  // Slide in the text
      setTimeout(() => {
          textContainer.classList.remove('show'); // Slide out the text
      }, 3000); // Text stays for 3 seconds
  }, 5000); // Text slides every 5 seconds
}

// Start the animation when the page loads
window.onload = startTextAnimation;







// Function to ensure the caption adjusts with the image height
function adjustCaption() {
  const images = document.querySelectorAll('.portfolio-image-container');
  
  images.forEach(imageContainer => {
    const image = imageContainer.querySelector('.portfolio-image');
    const caption = imageContainer.querySelector('.caption');

    // Ensure caption height is the same as the image height
    caption.style.height = image.offsetHeight + 'px';
  });
}

// Call adjustCaption when the page loads and when the window is resized
window.addEventListener('load', adjustCaption);
window.addEventListener('resize', adjustCaption);









































// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById('contact-form');
//   const submitButton = form.querySelector('button');
//   const loading = form.querySelector('.loading');
//   const errorMessage = form.querySelector('.error-message');
//   const successMessage = form.querySelector('.sent-message');

//   // Get popup elements
//   const popup = document.getElementById('popup');
//   const popupMessage = document.getElementById('popup-message');

//   form.addEventListener('submit', function (e) {
//     e.preventDefault();
    
//     // Show loading state
//     loading.style.display = 'block';
//     errorMessage.style.display = 'none';
//     successMessage.style.display = 'none';

//     const formData = new FormData(form);

//     // Use fetch to submit the form via AJAX (POST method)
//     fetch(form.action, {
//       method: 'POST',
//       body: formData
//     })
//     .then(response => {
//       if (response.ok) {
//         // Show success message
//         loading.style.display = 'none';
//         popupMessage.textContent = 'Your message has been sent successfully!';
//         popup.style.display = 'block';
//       } else {
//         throw new Error('Something went wrong');
//       }
//     })
//     .catch(error => {
//       // Show error message
//       loading.style.display = 'none';
//       errorMessage.textContent = 'There was an error submitting your form. Please try again.';
//       errorMessage.style.display = 'block';

//       popupMessage.textContent = 'Oops! Something went wrong. Please try again.';
//       popup.style.display = 'block';
//     });
//   });

//   // Close popup function
//   function closePopup() {
//     popup.style.display = 'none';
//   }
// });
