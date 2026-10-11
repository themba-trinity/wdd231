import { attractions } from "../data/attractions.mjs";

const container = document.getElementById("destinations");
const modal = document.getElementById("attraction");
const modalContent = document.getElementById("modalContent");

const allData = attractions;

// Debugging
console.log("Destinations loaded");
console.log(allData);
console.log(container);

// Display attractions
function display(list) {
    if (!container) {
        console.error("Container #destinations not found");
        return;
    }

    container.innerHTML = "";

    list.forEach(item => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
    <img src="${item.image}"
         alt="${item.name}"
         loading="lazy"
         width="400"
         height="250">

    <h3>${item.name}</h3>

    <p class="meta">
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

    addCardEvents();
}

// Add button events
function addCardEvents() {

    document.querySelectorAll(".learnBtn").forEach(button => {

        button.addEventListener("click", event => {

            const id = Number(event.target.dataset.id);

            const item = allData.find(
                attraction => attraction.id === id
            );

            if (!item) return;

            modalContent.innerHTML = `
    <h2>${item.name}</h2>

    <img
        src="${item.image}"
       /strong> ${item.location}</p>

    <p><strong>Country:</strong> ${item.country}</p>

    <p><strong>Best Time:</strong> ${item.bestTime}</p>

    <p><strong>Activities:</strong> ${item.activities.join(", ")}</p>

    <p><strong>What to Expect:</strong> ${item.expect}</p>

    <p><strong>Recommendation:</strong> ${item.recommendation}</p>

    <p>${item.description}</p>
`;
            modal.showModal();
        });
    });

    document.querySelectorAll(".wishBtn").forEach(button => {

        button.addEventListener("click", event => {

            const id = Number(event.target.dataset.id);

            let saved =
                JSON.parse(localStorage.getItem("sadcWishlist")) || [];

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

// Filters
document.querySelectorAll(".filters button").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".filters button")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        if (filter === "all") {
            display(allData);
            return;
        }

        const filtered = allData.filter(item =>
            item.category === filter ||
            item.country.includes(filter)
        );

        display(filtered);
    });
});

// Close modal
document.getElementById("closeModal")?.addEventListener("click", () => {
    modal.close();
});

// Initial display
display(allData);