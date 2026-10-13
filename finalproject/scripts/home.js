import { initNav } from "./navigation.js";

const API_KEY = "f4dc7fb97d0c2155db8ad90afdbf7e77";
const featureDiv = document.getElementById("featured");
const modal = document.getElementById("attractionsModal");
const modalContent = document.getElementById("modalContent");

async function getWeather(lat, lon) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        console.log("Status:", res.status);

        const data = await res.json();

        console.log(data);

        return `${Math.round(data.main.temp)}°C ${data.weather[0].main}`;

    } catch (error) {
        console.error(error);
        return "Weather unavailable";
        /*featureDiv.innerHTML =
            "<p>Error loading attractions.</p>";*/
    }
}

        
    


async function loadFeatured() {
    
    try {
        const attractionsModule = await import("../data/attractions.mjs");
        console.log(attractionsModule);
        const data =
            attractionsModule.attractions ||
            attractionsModule.default ||
            [];
        console.log(data);

        const featured = data.filter(item =>
            [1, 2, 3, 6, 8, 15].includes(item.id)
        );

        const cards = await Promise.all(
            featured.map(async item => {
                console.log(
                    "Fetching weather for:",
                    item.name,
                    item.lat,
                    item.lon
                );
                const weather = await getWeather(item.lat, item.lon);

                return `
                <section class="card">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="250">

                    <h3>${item.name}</h3>

                    <p class="meta">
                        ${item.country} | ${item.category}
                    </p>

                    <p class="weather">
                        📍 ${item.location} | 🌤️ ${weather}
                    </p>

                    <p>
                        <strong>Best:</strong> ${item.bestTime}
                    </p>

                    <button class="learnBtn" data-id="${item.id}">
                        Learn More
                    </button>

                    <button class="wishBtn" data-id="${item.id}">
                        ♡ Save
                    </button>
                </section>
                `;
            })
        );

        featureDiv.innerHTML = cards.join("");

        document.querySelectorAll(".learnBtn").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = Number(e.currentTarget.dataset.id);

                const item = data.find(
                    attraction => attraction.id === id
                );

                if (item) {
                    showModal(item);
                }
            });
        });

        document.querySelectorAll(".wishBtn").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = Number(e.currentTarget.dataset.id);
                saveWishlist(id);
            });
        });

    } catch (error) {
        console.error(error);

        featureDiv.innerHTML =
            `<p>Error loading attractions.</p>`;
    }
}

function showModal(item) {
    modalContent.innerHTML = `
        <h2>${item.name}</h2>

        <img
            src="${item.image}"
            alt="${item.name}"
            style="width:100%; border-radius:6px; margin:.5rem 0;"
            loading="lazy"
        >

        <p><strong>Country:</strong> ${item.country}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Best Time:</strong> ${item.bestTime}</p>
        <p><strong>What to Expect:</strong> ${item.expect}</p>
        <p><strong>Recommendation:</strong> ${item.recommendation}</p>
        <p><strong>Activities:</strong> ${item.activities.join(", ")}</p>
        <p>${item.description}</p>
    `;

    modal.showModal();
}

document
    .getElementById("closeModal")
    ?.addEventListener("click", () => modal.close());

function saveWishlist(id) {
    const stored = JSON.parse(
        localStorage.getItem("sadcWishlist") || "[]"
    );

    if (!stored.includes(id)) {
        stored.push(id);

        localStorage.setItem(
            "sadcWishlist",
            JSON.stringify(stored)
        );

        alert("Saved to wishlist");
    } else {
        alert("Already in wishlist");
    }
}

if (typeof initNav === "function") {
    initNav();
}

loadFeatured();