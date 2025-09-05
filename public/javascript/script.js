// Open and Close Navbar Menu
const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const bgOverlay = document.querySelector(".overlay");

if (burgerMenu && bgOverlay) {
  burgerMenu.addEventListener("click", () => {
    navbarMenu.classList.add("is-active");
    bgOverlay.classList.toggle("is-active");
  });

  bgOverlay.addEventListener("click", () => {
    navbarMenu.classList.remove("is-active");
    bgOverlay.classList.toggle("is-active");
  });
}

// Close Navbar Menu on Links Click
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    navbarMenu.classList.remove("is-active");
    bgOverlay.classList.remove("is-active");
  });
});

// Open and Close Search Bar Toggle
const searchBlock = document.querySelector(".search-block");
const searchToggle = document.querySelector(".search-toggle");
const searchCancel = document.querySelector(".search-cancel");

if (searchToggle && searchCancel) {
  searchToggle.addEventListener("click", () => {
    searchBlock.classList.add("is-active");
  });

  searchCancel.addEventListener("click", () => {
    searchBlock.classList.remove("is-active");
  });
}

// Subscribe config---
document
  .getElementById("subscribeForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("emailInput").value;

    // ...existing code...
    if (email === "Admin@Admin") {
      const adminPassword = prompt("Enter Admin Password:");
      if (adminPassword === "Admin@123") {
        // Password is correct, proceed with admin actions
        showToast("Admin access granted!", "#4fbe87");
        window.location.href = "/admin/adminPanel";
      } else {
        // Password is incorrect, show error or prevent further actions
        showToast("Incorrect password!", "red");
        return; // Stop further execution if needed
      }
    } else {
      try {
        const response = await fetch("/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (response.ok) {
          document.getElementById("message").textContent = result.message;
          document.getElementById("message").style.color = "green";
        } else {
          document.getElementById("message").textContent = result.message;
          document.getElementById("message").style.color = "red";
        }
      } catch (error) {
        document.getElementById("message").textContent = "Something went wrong.";
        document.getElementById("message").style.color = "red";
      }
    }

  });

// toast message
function showToast(message, color = "#4fbe87") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: color,
  }).showToast();
}
