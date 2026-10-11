import { attractions } from "../data/attractions.mjs";

const container = document.getElementById("allCards");
const modal = document.getElementById("attraction");
const modalContent = document.getElementById("modalContent");

let allData = attractions;

// Display destinations
function display(list) {
    container.innerHTML = "";

    list.forEach(item => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            ${item.image}

            <h3>${item.name}</h3>

            <p class="meta">
                ${item.country} | ${item.category}
            </p>

            <p>
                <strong>Best Time:</strong> ${item.bestTime}
            </p>

            <p>${item.description}</p>

            <button class="learnBtn" data-id="${item.id}">
                Learn More
            </button>

            <button class="wishBtn" data-id="${item.id}">
                ♡ Save
            </button>
        `;

        container.appendChild(card);
    });

    attachCardEvents();
}

// Learn More buttons
function attachCardEvents() {
    document.querySelectorAll(".learnBtn").forEach(button => {
        button.addEventListener("click", event => {
            const id = Number(event.target.dataset.id);

            const item = allData.find(place => place.id === id);

            if (!item) return;

            modalContent.innerHTML = `
                <h2>${item.name}</h2>

                ${item.image}

                <p>
                    <strong>Location:</strong>
                    ${item.location}
                </p>

                <p>
                    <strong>Country:</strong>
                    ${item.country}
                </p>

                <p>
                    <strong>Best Time:</strong>
                    ${item.bestTime}
                </p>

                <p>
                    <strong>Activities:</strong>
                    ${item.activities.join(", ")}
                </p>

                <p>
                    <strong>What to Expect:</strong>
                    ${item.expect}
                </p>

                <p>
                    <strong>Recommendation:</strong>
                    ${item.recommendation}
                </p>

                <p>${item.description}</p>
            `;

            modal.showModal();
        });
    });

    // Wishlist buttons
    document.querySelectorAll(".wishBtn").forEach(button => {
        button.addEventListener("click", event => {

            let saved =
                JSON.parse(localStorage.getItem("sadcWishlist")) || [];

            const id = Number(event.target.dataset.id);

            if (!saved.includes(id)) {
                saved.push(id);

                localStorage.setItem(
                    "sadcWishlist",
                    JSON.stringify(saved)
                );

                event.target.textContent = "✓ Saved";
            }
        });
    });
}

// Filter buttons
document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll(".filters button")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        if (filter === "all") {
            display(allData);
        } else {
            const filtered = allData.filter(item =>
                item.category === filter ||
                item.country.includes(filter)
            );

            display(filtered);
        }
    });
});

// Close modal
document.getElementById("closeModal")
    .addEventListener("click", () => {
        modal.close();
    });

// Initial display
display(allData);