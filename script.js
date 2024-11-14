// Example date validation
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');

checkInInput.addEventListener('change', () => {
    checkOutInput.min = checkInInput.value; // Sets minimum check-out date to the selected check-in date
});

// Room prices
const roomPrices = {
    "suite": 32000,
    "sea-facing": 15000,
    "chalet": 10000,
    "presidential": 55000,
    "deluxe": 23000
};

// Select the room dropdown and price display element
const roomTypeSelect = document.getElementById('room');
const priceDisplay = document.getElementById('price');

// Initial price display based on the default selection
priceDisplay.textContent = `₹${roomPrices[roomTypeSelect.value]}/night`;

// Update the price when the user selects a room type
roomTypeSelect.addEventListener('change', () => {
    const selectedRoom = roomTypeSelect.value;
    priceDisplay.textContent = `₹${roomPrices[selectedRoom]}/night`;  // Update price text
});

// JavaScript for Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

// Initialize by showing the first slide
showSlides(slideIndex);

function showSlides(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active'); // Hide all slides
        if (i === index) {
            slide.classList.add('active'); // Show the current slide
        }
    });
}

document.querySelector('.next').addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlides(slideIndex);
});

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlides(slideIndex);
});

// Automatic slideshow every 3 seconds
setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlides(slideIndex);
}, 3000);

// Booking confirmation example
document.getElementById('booking-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert("Thank you for booking with us! We'll confirm your reservation shortly.");
});

// Simple scroll animation
window.addEventListener('scroll', () => {
    const roomsSection = document.querySelector('.rooms-section');
    if (window.scrollY > roomsSection.offsetTop - window.innerHeight / 2) {
        roomsSection.classList.add('fade-in');
    }
});
