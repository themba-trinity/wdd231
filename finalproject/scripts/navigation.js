export function initNav() {
    const menuButton = document.querySelector("#menu");
    const nav = document.querySelector("#mainNav");

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");

        if (nav.classList.contains("open")) {
            menuButton.textContent = "✖";
        } else {
            menuButton.textContent = "☰";
        }
    });
    const year = document.getElementById('currentyear');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const Im = document.getElementById('lastModified');
    if (Im) {
        Im.textContent = `Last Modified: ${document.lastModified}`; 
    }

    const ts = document.getElementById('timestamp'); 
    if (ts) {
        ts.value = new Date().toISOString();
    }
}
