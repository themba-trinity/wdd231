const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const filtered = members.filter(member => member.membership >= 2);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy" width="100" height="60">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">website</a></p>
            <p class="level">${member.membership === 3 ? "Gold Member" : "Silver Member"}</p>
        `;
        spotlightContainer.appendChild(card);
    });
}

getSpotlights();