
// Site Name Generator
const generateSiteName = () => {
  const adjectives = ["Royal", "Imperial", "Majestic", "Opulent", "Luxe", "Golden", "Diamond", "Elite"];
  const nouns = ["Fortune", "Paradise", "Oasis", "Empire", "Mirage", "Crown", "Jackpot"];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${randomAdjective} ${randomNoun}`;
};

// Update site name throughout the site
const updateSiteName = () => {
  const siteName = generateSiteName();
  document.getElementById("brandName").textContent = siteName;
  document.getElementById("mainTitle").textContent = siteName;
  document.getElementById("footerBrandName").textContent = siteName;
  document.title = `${siteName} | Luxury Casino Resorts Worldwide`;
};

// Initialize Animate on Scroll
const initAOS = () => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
  });
};

// Initialize all Swiper instances
const initSwipers = () => {
  // Gallery Swiper
  new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    lazy: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Events Swiper
  new Swiper('.events-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
    },
  });

  // Testimonials Swiper
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
};

// Handle mobile menu
const setupMobileMenu = () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  mobileMenuCloseBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
};

// Navbar scroll effect
const setupNavbarScroll = () => {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-casino-dark');
      navbar.classList.remove('bg-casino-dark/75');
    } else {
      navbar.classList.remove('bg-casino-dark');
      navbar.classList.add('bg-casino-dark/75');
    }
  });
};

// Back to top button
const setupBackToTopButton = () => {
  const backToTopBtn = document.getElementById('backToTopBtn');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.remove('opacity-0', 'invisible');
      backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
      backToTopBtn.classList.add('opacity-0', 'invisible');
      backToTopBtn.classList.remove('opacity-100', 'visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// FAQ Accordion
const setupAccordion = () => {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });
};

// Main countdown timer for hero section
const setupMainCountdown = () => {
  // Set the date for the next VIP event (about 30 days from now)
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 15);
  const countdownDate = nextMonth.getTime();
  
  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
      clearInterval(countdownTimer);
      document.getElementById("days").innerHTML = "00";
      document.getElementById("hours").innerHTML = "00";
      document.getElementById("minutes").innerHTML = "00";
      document.getElementById("seconds").innerHTML = "00";
    }
  }, 1000);
};

// Event individual countdown timers
const setupEventCountdowns = () => {
  const eventTimers = document.querySelectorAll('.event-timer');
  
  eventTimers.forEach(timer => {
    const eventDate = new Date(timer.dataset.date).getTime();
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      if (distance < 0) {
        timer.innerHTML = "Event has started";
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      timer.innerHTML = `${days}d ${hours}h ${minutes}m`;
    };
    
    updateTimer();
    setInterval(updateTimer, 60000); // Update every minute
  });
};

// Load More Button
const setupLoadMoreButton = () => {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const spinner = loadMoreBtn.querySelector('.spinner');
  
  loadMoreBtn.addEventListener('click', () => {
    // Show spinner
    spinner.classList.remove('hidden');
    loadMoreBtn.querySelector('span').textContent = 'Loading...';
    
    // Simulate loading delay
    setTimeout(() => {
      // Hide spinner
      spinner.classList.add('hidden');
      loadMoreBtn.querySelector('span').textContent = 'No More Results';
      loadMoreBtn.disabled = true;
      loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }, 2000);
  });
};

// Casino Modal
const setupCasinoModal = () => {
  const modal = document.getElementById('casinoModal');
  const closeButtons = modal.querySelectorAll('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
  
  const casinoData = {
    'bellagio': {
      name: 'Bellagio',
      image: 'https://images.unsplash.com/photo-1599134842279-fe807d23316e',
      rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
      location: 'Las Vegas, Nevada, USA',
      games: '2,300+ slot machines, 140 gaming tables',
      rooms: '3,950 luxury rooms and suites',
      description: 'The Bellagio is a resort, luxury hotel and casino on the Las Vegas Strip in Paradise, Nevada. It is owned by The Blackstone Group and operated by MGM Resorts International and was built on the site of the demolished Dunes hotel and casino. Inspired by the Lake Como town of Bellagio in Italy, Bellagio is famed for its elegance.',
      website: 'https://bellagio.mgmresorts.com/',
      booking: 'https://bellagio.mgmresorts.com/en/booking/room-booking.html'
    },
    'wynn': {
      name: 'Wynn Las Vegas',
      image: 'https://images.unsplash.com/photo-1601821135361-9c030ff75259',
      rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
      location: 'Las Vegas, Nevada, USA',
      games: '1,800+ slot machines, 110 table games',
      rooms: '2,716 rooms and suites',
      description: 'Wynn Las Vegas, often simply referred to as Wynn, is a luxury resort and casino located on the Las Vegas Strip in Paradise, Nevada, United States. The US$2.7-billion resort is named after casino developer Steve Wynn and is the flagship property of Wynn Resorts.',
      website: 'https://www.wynnlasvegas.com/',
      booking: 'https://www.wynnlasvegas.com/rooms-and-suites'
    },
    'marina-bay-sands': {
      name: 'Marina Bay Sands',
      image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170',
      rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
      location: 'Singapore',
      games: '500+ table games, 1,600+ slot machines',
      rooms: '2,561 luxury rooms and suites',
      description: 'Marina Bay Sands is an integrated resort fronting Marina Bay in Singapore. The iconic design has transformed Singapore\'s skyline and tourism landscape since it opened in 2010. The complex includes a hotel, convention and exhibition facilities, theatres, entertainment venues, retailers, and restaurants.',
      website: 'https://www.marinabaysands.com/',
      booking: 'https://www.marinabaysands.com/hotel/rooms-suites.html'
    },
    'mgm-grand': {
      name: 'MGM Grand',
      image: 'https://images.unsplash.com/photo-1519756747-97862e3ac4d3',
      rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>',
      location: 'Las Vegas, Nevada, USA',
      games: '2,500+ slot machines, 170 table games',
      rooms: '6,852 rooms and suites',
      description: 'The MGM Grand Las Vegas is a hotel and casino located on the Las Vegas Strip in Paradise, Nevada. It is the largest single hotel in the United States with 6,852 rooms. The property includes five outdoor pools, rivers, and waterfalls that cover 6.6 acres, a 380,000 sq ft convention center, and the Grand Garden Arena.',
      website: 'https://mgmgrand.mgmresorts.com/',
      booking: 'https://mgmgrand.mgmresorts.com/en/booking/room-booking.html'
    },
    'sun-city': {
      name: 'Sun City Resort',
      image: 'https://images.unsplash.com/photo-1590615368905-f923f0c317a8',
      rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
      location: 'North West Province, South Africa',
      games: '850 slot machines, 40 gaming tables',
      rooms: '1,500 rooms across 4 hotels',
      description: 'Sun City is a luxury resort and casino situated in the North West Province of South Africa. It is located between the Elands River and the Pilanesberg, about 140km northwest of Johannesburg. The complex borders the Pilanesberg Game Reserve and features four hotels, two championship golf courses, and more.',
      website: 'https://www.suninternational.com/sun-city/',
      booking: 'https://www.suninternational.com/sun-city/accommodation/'
    },
    'monte-carlo': {
      name: 'Casino de Monte-Carlo',
      image: 'https://images.unsplash.com/photo-1613618947192-fde548f915bc',
      rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
      location: 'Monte Carlo, Monaco',
      games: '300+ gaming tables and slot machines',
      rooms: 'Casino only - Hotel de Paris adjacent',
      description: 'The Casino de Monte-Carlo is a gambling and entertainment complex located in Monaco. It includes a casino, the Opera de Monte-Carlo, and the office of Les Ballets de Monte-Carlo. The Casino de Monte-Carlo is owned and operated by the Societe des bains de mer de Monaco, a public company in which the Monaco government holds a majority interest.',
      website: 'https://www.montecarlosbm.com/en/casino-monaco',
      booking: 'https://www.montecarlosbm.com/en/hotel-monaco'
    }
  };
  
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const casinoId = button.dataset.casino;
      const casino = casinoData[casinoId];
      
      document.getElementById('modalCasinoImage').src = casino.image;
      document.getElementById('modalCasinoName').textContent = casino.name;
      document.getElementById('modalCasinoRating').innerHTML = casino.rating;
      document.getElementById('modalCasinoLocation').textContent = casino.location;
      document.getElementById('modalCasinoGames').textContent = casino.games;
      document.getElementById('modalCasinoRooms').textContent = casino.rooms;
      document.getElementById('modalCasinoDescription').textContent = casino.description;
      document.getElementById('modalCasinoWebsite').href = casino.website;
      document.getElementById('modalCasinoBooking').href = casino.booking;
      
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });
  
  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };
  
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  
  overlay.addEventListener('click', closeModal);
};

// Event RSVP Modal
const setupEventModal = () => {
  const modal = document.getElementById('eventModal');
  const closeButtons = modal.querySelectorAll('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  const rsvpButtons = document.querySelectorAll('.rsvp-btn');
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSubmitBtn = document.getElementById('rsvpSubmitBtn');
  const spinner = rsvpSubmitBtn.querySelector('.spinner');
  
  const eventData = {
    'poker-championship': {
      name: 'World Series Poker Championship',
      image: 'https://images.unsplash.com/photo-1569863629758-59b3cbb0f090',
      date: 'July 15, 2025 at 8:00 PM',
      description: 'Join us for the most prestigious poker tournament of the year, featuring world-class players competing for a guaranteed $10 million prize pool. The event will be televised globally with celebrity participants and special entertainment.',
      location: 'Grand Ballroom, Main Casino Floor',
      price: 'Buy-in: $10,000 / Spectators: $500',
      capacity: 'Players: 200 / Audience: 1,000'
    },
    'nye-gala': {
      name: 'New Year\'s Eve Extravaganza',
      image: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78',
      date: 'December 31, 2025 at 8:00 PM',
      description: 'Ring in the New Year with our annual black-tie gala featuring a gourmet dinner, premium open bar, and entertainment by A-list performers. The evening culminates with a spectacular midnight celebration and champagne toast.',
      location: 'Diamond Ballroom, East Wing',
      price: 'VIP: $2,000 / Standard: $1,200',
      capacity: 'Limited to 800 guests'
    },
    'jazz-festival': {
      name: 'Summer Jazz Nights Festival',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
      date: 'August 25-27, 2025 at 7:00 PM',
      description: 'Experience three unforgettable nights of world-class jazz performances in our elegant Grand Ballroom. Each evening features different acclaimed artists, complemented by fine dining and premium beverages.',
      location: 'Grand Ballroom, Main Casino Floor',
      price: '3-Day Pass: $900 / Single Night: $350',
      capacity: '600 guests per night'
    },
    'wine-showcase': {
      name: 'Rare Vintage Wine Showcase',
      image: 'https://images.unsplash.com/photo-1606167668584-78701c57f90d',
      date: 'October 12, 2025 at 6:30 PM',
      description: 'Sample extraordinary vintages curated by our Master Sommelier, including rare releases and private reserve selections. The evening includes gourmet food pairings prepared by our Michelin-starred culinary team.',
      location: 'Crystal Wine Cellar, Lower Level',
      price: 'General: $650 / VIP: $1,100',
      capacity: 'Limited to 120 guests'
    }
  };
  
  rsvpButtons.forEach(button => {
    button.addEventListener('click', () => {
      const eventId = button.dataset.event;
      const event = eventData[eventId];
      
      document.getElementById('modalEventImage').src = event.image;
      document.getElementById('modalEventName').textContent = event.name;
      document.getElementById('modalEventDate').textContent = event.date;
      document.getElementById('modalEventDescription').textContent = event.description;
      document.getElementById('modalEventLocation').textContent = event.location;
      document.getElementById('modalEventPrice').textContent = event.price;
      document.getElementById('modalEventCapacity').textContent = event.capacity;
      
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });
  
  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    rsvpForm.reset();
  };
  
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  
  overlay.addEventListener('click', closeModal);
  
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show spinner
    spinner.classList.remove('hidden');
    rsvpSubmitBtn.querySelector('span').textContent = 'Processing...';
    
    // Simulate form submission
    setTimeout(() => {
      // Hide spinner
      spinner.classList.add('hidden');
      rsvpSubmitBtn.querySelector('span').textContent = 'Confirm RSVP';
      
      // Show toast notification
      showToast('Your RSVP has been confirmed! Check your email for details.');
      
      // Close modal
      closeModal();
    }, 1500);
  });
};

// VIP Form Validation and Submission
const setupVIPForm = () => {
  const vipForm = document.getElementById('vipForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const countryInput = document.getElementById('country');
  const casinoInputs = document.querySelectorAll('input[name="favorite-casino"]');
  const submitBtn = document.getElementById('vipSubmitBtn');
  const spinner = submitBtn.querySelector('.spinner');
  const successModal = document.getElementById('successModal');
  const closeButtons = successModal.querySelectorAll('.modal-close');
  const overlay = successModal.querySelector('.modal-overlay');
  
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const validateForm = () => {
    let isValid = true;
    const errorMessages = document.querySelectorAll('.error-message');
    
    // Reset error messages
    errorMessages.forEach(el => {
      el.textContent = '';
      el.classList.add('hidden');
    });
    
    // Validate name
    if (nameInput.value.trim() === '') {
      nameInput.nextElementSibling.textContent = 'Please enter your name';
      nameInput.nextElementSibling.classList.remove('hidden');
      isValid = false;
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
      emailInput.nextElementSibling.textContent = 'Please enter your email';
      emailInput.nextElementSibling.classList.remove('hidden');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailInput.nextElementSibling.textContent = 'Please enter a valid email';
      emailInput.nextElementSibling.classList.remove('hidden');
      isValid = false;
    }
    
    // Validate country
    if (countryInput.value === '') {
      countryInput.nextElementSibling.textContent = 'Please select your country';
      countryInput.nextElementSibling.classList.remove('hidden');
      isValid = false;
    }
    
    // Validate favorite casino
    let casinoSelected = false;
    casinoInputs.forEach(input => {
      if (input.checked) {
        casinoSelected = true;
      }
    });
    
    if (!casinoSelected) {
      casinoInputs[0].parentElement.parentElement.nextElementSibling.textContent = 'Please select a preferred casino';
      casinoInputs[0].parentElement.parentElement.nextElementSibling.classList.remove('hidden');
      isValid = false;
    }
    
    return isValid;
  };
  
  vipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Show spinner
      spinner.classList.remove('hidden');
      submitBtn.querySelector('span').textContent = 'Processing...';
      
      // Simulate form submission
      setTimeout(() => {
        // Hide spinner
        spinner.classList.add('hidden');
        submitBtn.querySelector('span').textContent = 'Submit Application';
        
        // Show success modal with confetti effect
        successModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        createConfetti();
        
        // Reset form
        vipForm.reset();
      }, 1500);
    }
  });
  
  const closeModal = () => {
    successModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };
  
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  
  overlay.addEventListener('click', closeModal);
};

// Newsletter Form
const setupNewsletterForm = () => {
  const newsletterForm = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const errorMessage = emailInput.nextElementSibling;
    
    // Reset error message
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
    
    // Validate email
    if (email === '') {
      errorMessage.textContent = 'Please enter your email';
      errorMessage.classList.remove('hidden');
      return;
    }
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      errorMessage.textContent = 'Please enter a valid email';
      errorMessage.classList.remove('hidden');
      return;
    }
    
    // If email is valid, submit the form
    showToast('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
  });
};

// Gallery Lightbox
const setupGalleryLightbox = () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      lightboxImage.src = imgSrc;
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      // Add active class after a slight delay for animation
      setTimeout(() => {
        lightbox.querySelector('.lightbox-content').classList.add('active');
      }, 10);
    });
  });
  
  const closeLightbox = () => {
    lightbox.querySelector('.lightbox-content').classList.remove('active');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  };
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
};

// Toast Notification
const showToast = (message) => {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// Create confetti effect
const createConfetti = () => {
  const confettiCount = 100;
  const colors = ['#D4AF37', '#ffffff', '#7E1717', '#0F2236', '#ffd700'];
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
};

// Set current year in footer
const setCurrentYear = () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
};

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  updateSiteName();
  initAOS();
  initSwipers();
  setupMobileMenu();
  setupNavbarScroll();
  setupBackToTopButton();
  setupAccordion();
  setupMainCountdown();
  setupEventCountdowns();
  setupLoadMoreButton();
  setupCasinoModal();
  setupEventModal();
  setupVIPForm();
  setupNewsletterForm();
  setupGalleryLightbox();
  setCurrentYear();
});
