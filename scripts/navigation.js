const navButton = document.querySelector("#nav-button");
const nav = document.querySelector("#animatene");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    nav.classList.toggle("open");
});
