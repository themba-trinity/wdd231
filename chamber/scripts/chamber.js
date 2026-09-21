const menuButton = document.querySelector("#nav-menu");
const nav = document.querySelector("nav");
menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.classList.toggle("open");

});