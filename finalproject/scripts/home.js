import { initNav } from "./attractions.mjs";

const API_KEY = '4a8140506717263780bfb59245fc2a6d';
const featureDiv = document.getElementById('feature');
const modal = document.getElementById('attractionsModal');
const modalContent = document.getElementById('modalContent');

async function getWeather(lat, lon) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (!res.ok) throw new Error('Weather fail');
        const data = await res.json();
        return `${Math.round(data.main.temp)}℃ ${data.weather[0].main}`;
    } catch (error) {
        return 'weather N/A';
    }
}

async function loadFeatured() {
    try {
        const attractionsModule = await import('../data/attractions.mjs');
        const data = attractionsModule.attractions || attractionsModule.default || [];
        const featured = data.filter(item => [1, 2, 3, 6, 8, 15].includes(item.id));

        const cards = await Promise.all(
            featured.map(async item => {
                const weather = await getWeather(item.lat, item.lon);
                return `
          <section class="card">
            <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="250">
            <h3>${item.name}</h3>
            <p class="meta">${item.country} | ${item.category}</p>
            <p class="weather">📍 ${item.location} | 🌤️ ${weather}</p>
            <p><strong>Best:</strong> ${item.bestTime}</p>
            <button class="learnBtn" data-id="${item.id}">Learn More</button>
            <button class="wishBtn" data-id="${item.id}">♡ Save</button>
          </section>`;
            })
        );

        if (!featureDiv) return;
        featureDiv.innerHTML = cards.join('');

        document.querySelectorAll('.learnBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.dataset.id);
                const item = data.find(a => a.id === id);
                if (item) showModal(item);
            });
        });

        document.querySelectorAll('.wishBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.dataset.id);
                saveWishlist(id);
            });
        });
    } catch (error) {
        if (featureDiv) {
            featureDiv.innerHTML = `<p>Error loading: ${error.message}</p>`;
        }
    }
}

function showModal(item) {
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
    <h2>${item.name}</h2>
    <img src="item.image"alt="{item.image}" alt="item.image"alt="{item.name}" style="width:100%;border-radius:6px;margin:0.5rem 0" loading="lazy">
    <p><strong>Country:</strong> ${item.country}</p>
    <p><strong>Location:</strong> ${item.location}</p>
    <p><strong>Best Time:</strong> ${item.bestTime}</p>
    <p><strong>What to Expect:</strong> ${item.expect}</p>
    <p><strong>Recommendation:</strong> ${item.recommendation}</p>
    <p><strong>Activities:</strong> ${item.activities.join(', ')}</p>
    <p>${item.description}</p>
  `;
    modal.showModal();
}

document.getElementById('closeModal')?.addEventListener('click', () => modal.close());

function saveWishlist(id) {
    const stored = JSON.parse(localStorage.getItem('sadcWishlist') || '[]');
    const list = Array.isArray(stored) ? stored : [];

    if (!list.includes(id)) {
        list.push(id);
        localStorage.setItem('sadcWishlist', JSON.stringify(list));
        alert('saved to wishlist');
    } else {
        alert('Already in wishlist');
    }
}

if (typeof initNav === 'function') {
    initNav();
}

if (featureDiv) {
    loadFeatured();
}
