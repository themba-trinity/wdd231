import { attractions } from "../data/discover.mjs";
const container = document.getElementById('discoverCards');
attractions.forEach(item => {
    const card = document.createElement('section');
    card.classList.add('discover-card');
    card.style.gridArea = item.area;

    card.innerHTML = `
        <div>
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>learn More</button>
        </div>
    `;
    container.appendChild(card);
})
const messageDiv = document.getElementById('visitMessage');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    messageDiv.textContent = "Welcome! Please let us know if you have any questions";
} else {
    const diffMs = now - Number(lastVisit);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < 24 * 60 * 60 * 1000) {
        messageDiv.textContent = "back so soon!";
    } else if (diffDays === 1) {
        messageDiv.textContent = "You last visited 1 day ago";
    } else {
        messageDiv.textContent = 'You last visited ${diffDays} days ago.';
    }

}
localStorage.setItem("lastVisit", now.toString());