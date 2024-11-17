class Slider {
  slideIndex = 0;
  slides = [];
  constructor() {
    this.slides = document.querySelectorAll(".slide");

    document
      .querySelector(".next")
      .addEventListener("click", () => this.nextSlide());

    document
      .querySelector(".prev")
      .addEventListener("click", () => this.prevSlide());
  }

  nextSlide() {
    this.slideIndex = (this.slideIndex + 1) % this.slides.length;
    this.showSlide();
  }
  prevSlide() {
    this.slideIndex =
      (this.slideIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide();
  }

  showSlide() {
    this.slides.forEach((slide, i) => {
      slide.classList.remove("active"); // Hide all slides
      if (i === this.slideIndex) {
        slide.classList.add("active"); // Show the current slide
      }
    });
  }

  rotateSlides() {
    // Automatic slideshow every 3 seconds
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }
}

class App {
  BASE_URL = "http://127.0.0.1:5000/api";

  getRooms() {
    const roomDropdown = document.getElementById("room_type");

    // Call the API to fetch room data
    fetch(this.BASE_URL + "/rooms")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((rooms) => {
        rooms = rooms?.available_rooms;
        // Clear existing options
        roomDropdown.innerHTML = "";

        // Add a default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a room";
        roomDropdown.appendChild(defaultOption);

        // Populate dropdown with room data
        for (const [roomType, price] of Object.entries(rooms)) {
          const option = document.createElement("option");
          option.value = roomType;
          option.dataset.price = price;
          option.textContent = `${
            roomType.charAt(0).toUpperCase() + roomType.slice(1)
          } - ₹${price}/night`;
          roomDropdown.appendChild(option);
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        roomDropdown.innerHTML = `<option value="">Failed to load rooms</option>`;
      });
  }

  init() {
    this.getRooms();

    const checkInInput = document.getElementById("checkin");
    const checkOutInput = document.getElementById("checkout");

    checkInInput.addEventListener("change", () => {
      checkOutInput.min = checkInInput.value; // Sets minimum check-out date to the selected check-in date
    });

    //   Slide show controller
    const slideController = new Slider();
    slideController.showSlide();
    slideController.rotateSlides();

    // Select the room dropdown and price display element
    const roomTypeSelect = document.getElementById("room_type");
    const priceDisplay = document.getElementById("price");

    // Update the price when the user selects a room type
    roomTypeSelect.addEventListener("change", (ev) => {
      const roomPrice =
        ev.target.options[ev.target.selectedIndex].dataset.price;
      priceDisplay.textContent = `₹${roomPrice}/night`; // Update price text
    });

    // Booking confirmation example
    document
      .getElementById("booking-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const roomType = document.getElementById("room_type").value;
        const checkinDate = document.getElementById("checkin").value;
        const checkoutDate = document.getElementById("checkout").value;

        // Construct the payload
        const bookingData = {
          name,
          email,
          room_type: roomType,
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
        };

        console.log("Booking Data:", bookingData);

        try {
          // Send data to API
          const response = await fetch(this.BASE_URL + "/book", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          });

          if (response.ok) {
            alert(
              "Thank you for booking with us! We'll confirm your reservation shortly."
            );
          } else {
            const error = await response.json();
            alert("Error: " + error.error);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to send booking. Please try again later.");
        }
      });

    // Simple scroll animation
    window.addEventListener("scroll", () => {
      const roomsSection = document.querySelector("#rooms");
      if (window.scrollY > roomsSection.offsetTop - window.innerHeight / 2) {
        roomsSection.classList.add("fade-in");
      }
    });
  }
}

window.addEventListener("load", function () {
  const app = new App();
  app.init();
});
