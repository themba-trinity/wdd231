export function initNav() {
    const menu = document.getElementById('navBtn');
    const nav = document.getElementById('nav');

    menu?.addEventListener('click', () => {
        nav.classList.toggle('open');
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
