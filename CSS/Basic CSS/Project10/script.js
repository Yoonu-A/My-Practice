// ==========================================
// TECHNOVA ACADEMY JAVASCRIPT
// ==========================================
// ================= MOBILE MENU =================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});
// Close mobile menu after clicking a link
const navigationLinks =
    document.querySelectorAll(".nav-links a");
navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});
// ================= LOGIN MODAL =================
const loginBtn =
    document.getElementById("loginBtn");
const loginModal =
    document.getElementById("loginModal");
const closeLogin =
    document.getElementById("closeLogin");
// Open login
loginBtn.addEventListener("click", function () {
    loginModal.classList.add("show");
});
// Close login
closeLogin.addEventListener("click", function () {
    loginModal.classList.remove("show");
});
// Close modal when clicking outside
loginModal.addEventListener("click", function (event) {
    if (event.target === loginModal) {
        loginModal.classList.remove("show");
    }
});
// ================= LOGIN =================
const loginSubmit =
    document.querySelector(".login-submit");
const loginMessage =
    document.getElementById("loginMessage");
loginSubmit.addEventListener("click", function () {
    loginMessage.textContent =
        "Demo login successful!";
    loginMessage.style.color = "green";
});
// ================= COURSE BUTTONS =================
const courseButtons =
    document.querySelectorAll(".course-btn");
courseButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        alert(
            "Course details will be available soon!"
        );
    });
});
// ================= CONTACT FORM =================
const contactForm =
    document.getElementById("contactForm");
const formMessage =
    document.getElementById("formMessage");
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name =
        document.getElementById("name").value.trim();
    const email =
        document.getElementById("email").value.trim();
    const subject =
        document.getElementById("subject").value.trim();
    const message =
        document.getElementById("message").value.trim();
    // Empty field check
    if (
        name === "" ||
        email === "" ||
        subject === "" ||
        message === ""
    ) {
        formMessage.textContent =
            "Please fill in all fields.";
        formMessage.style.color = "red";
        return;
    }
    // Email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent =
            "Please enter a valid email.";
        formMessage.style.color = "red";
        return;
    }
    // Success
    formMessage.textContent =
        "Thank you! Your message has been sent successfully.";
    formMessage.style.color = "green";
    // Clear form
    contactForm.reset();
});
// ================= TESTIMONIAL SLIDER =================
const reviews = [
    {
        text:
            "The courses helped me understand web development from the basics.",
        name:
            "— Ahmed"
    },
    {
        text:
            "The cyber security lessons were simple and practical.",
        name:
            "— Mohamed"
    },
    {
        text:
            "I built my first website after joining TechNova.",
        name:
            "— Aisha"
    },
    {
        text:
            "The mentors gave me great guidance for my career.",
        name:
            "— Rishad"
    }
];
let currentReview = 0;
const reviewText =
    document.getElementById("reviewText");
const reviewName =
    document.getElementById("reviewName");
function showReview() {
    reviewText.textContent =
        '"' + reviews[currentReview].text + '"';
    reviewName.textContent =
        reviews[currentReview].name;
}
document
    .getElementById("nextReview")
    .addEventListener("click", function () {
        currentReview++;
        if (currentReview >= reviews.length) {
            currentReview = 0;
        }
        showReview();
    });
document
    .getElementById("previousReview")
    .addEventListener("click", function () {
        currentReview--;
        if (currentReview < 0) {
            currentReview = reviews.length - 1;
        }
        showReview();
    });
// ================= AUTO SLIDER =================
setInterval(function () {
    currentReview++;
    if (currentReview >= reviews.length) {
        currentReview = 0;
    }
    showReview();
}, 5000);
// ================= SCROLL MESSAGE =================
window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        console.log(
            "User is exploring TechNova."
        );
    }
});
// ================= PAGE LOAD =================
window.addEventListener("load", function () {
    console.log(
        "Welcome to MARS TECH Academy!"
    );
});