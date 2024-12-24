const menuBreakfast = document.querySelector(".menu__heading--1");
const menuLunch = document.querySelector(".menu__category--heading--2");
const menuDinner = document.querySelector(".menu__heading--3");
const menuDesserts = document.querySelector(".menu__heading--4");
const menuAll = document.querySelectorAll(".menu__heading");
const menuItemBreakfast = document.querySelector(".menu__container--breakfast");
const menuItemLunch = document.querySelector(".menu__container--lunch");
const menuItemDinner = document.querySelector(".menu__container--dinner");
const menuItemDessert = document.querySelector(".menu__container--dessert");
const categoryHeadings = document.querySelectorAll(".menu__category--heading");
const menuContainers = document.querySelectorAll(".menu-container");

function switchCategory(event) {
  // Remove the active class from all category headings
  categoryHeadings.forEach((heading) => heading.classList.remove("highlight"));

  // Add the active class to the clicked heading
  event.target.classList.add("highlight");

  // Get the selected category from the clicked heading's dataset
  const selectedCategory = event.target.dataset.category;
  console.log(selectedCategory);

  // Show the selected category's menu items and hide others
  menuContainers.forEach((container) => {
    if (container.classList.contains(`menu__container--${selectedCategory}`)) {
      container.style.display = "grid";
      container.classList.remove("hidden");
      container.style.animationName = "moveInLeft";
      container.style.animationDuration = "1.5s"; // Show the selected category
    } else {
      container.style.animationName = "moveOutRight"; // Hide others
      container.style.animationDuration = "0.5s";
      container.style.display = "none"; // Hide others
    }
  });
}

// Add click event listeners to category headings
categoryHeadings.forEach((heading) => {
  heading.addEventListener("click", switchCategory);
});

const scrollAnimation = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    console.log(entry);

    if (entry.isIntersecting) {
      // Add the "show" class if not already added
      entry.target.classList.add("show");

      // Stop observing the element to prevent future interactions
      observer.unobserve(entry.target);
    }
  });
});

const hiddenElements = document.querySelectorAll(".section--hidden");
hiddenElements.forEach((el) => scrollAnimation.observe(el));
////////////////////////////////////////////////////// Select all the testimonial slides and navigation elements
const slides = document.querySelectorAll(".testimonial__text--box");
const btnLeft = document.querySelector(".arrow__left");
const btnRight = document.querySelector(".arrow__right");
const dotsContainer = document.querySelector(".dots");

// Initialize variables
let curSlide = 0;
const maxSlide = slides.length;

// Function to create dots dynamically based on the number of slides
const createDots = () => {
  slides.forEach((_, i) => {
    const dotHTML = `<div class="dot" data-slide="${i}"></div>`;
    dotsContainer.insertAdjacentHTML("beforeend", dotHTML);
  });
};

// Function to activate a specific dot
const activateDot = (slide) => {
  // Remove "active" class from all dots
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("active"));

  // Add "active" class to the corresponding dot
  document.querySelector(`.dot[data-slide="${slide}"]`).classList.add("active");
};

// Function to go to a specific slide
const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`; // Arrange slides horizontally
  });

  // Update the active dot
  activateDot(slide);
};

// Function to move to the previous slide
const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1; // Wrap around to the last slide
  } else {
    curSlide--;
  }
  goToSlide(curSlide); // Update the slide position
};

// Function to move to the next slide
const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0; // Wrap around to the first slide
  } else {
    curSlide++;
  }
  goToSlide(curSlide); // Update the slide position
};

// Event listener for left arrow button
btnLeft.addEventListener("click", prevSlide);

// Event listener for right arrow button
btnRight.addEventListener("click", nextSlide);

// Event listener for dots
dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    curSlide = Number(slide); // Update the current slide
    goToSlide(curSlide); // Navigate to the corresponding slide
  }
});

// Initialize the slider
const init = () => {
  createDots(); // Generate the dots dynamically
  goToSlide(0); // Set the initial slide
};

init();

/////////////////////////////////////////////////////////////
const reservationForm = document.querySelector(".reservation-form");
const reservationDetails = document.querySelector(".reservation-details");
document.addEventListener("DOMContentLoaded", function () {
  // Handle reservation form submission

  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;

    // Display reservation details
    reservationDetails.innerHTML = `
      <h3>Reservation Details</h3>
      <p id="reservationName"><strong>Name:</strong> ${name}</p>
      <p id="reservationEmail"><strong>Email:</strong> ${email}</p>
      <p id="reservationPhone"><strong>Phone:</strong> ${phone}</p>
      <p id="reservationDate"><strong>Date:</strong> ${date}</p>
      <p id="reservationTime"><strong>Time:</strong> ${time}</p>
      <p id="reservationGuests"><strong>Number of Guests:</strong> ${guests}</p>
    `;
    reservationDetails.style.animationName = "moveInLeft";
    reservationDetails.style.animationDuration = "1.5s";
  });
});
