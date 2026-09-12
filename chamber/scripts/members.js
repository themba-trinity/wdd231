const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    membersContainer.innerHTML = '';
    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Convert membership string to number
        const membershipLevel = parseInt(member.membership) === 3 ? "Gold" :
            parseInt(member.membership) === 2 ? "Silver" : "Member";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="150">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership: ${membershipLevel}</p>
        `;
        membersContainer.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

getMembers();
