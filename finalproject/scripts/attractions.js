let allData = [];
const container = document.getElementById('allCards');
const modal = document.getElementById('atrractionsModal');
const modalContent = document.getElementById('modalContent');

async function fetchAttractions() {
    try {
        const res = await fetch('data/attractions.mjs');
        if (!res.ok) throw new Error('Failed');
        allData = await res.json();
        display(allData);
    } catch (error) {
        container.innerHTML = `Error: ${error.message}`;
    }
}

function display(list) {
    const html = list.map(item => `
        <section class="card">
            <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="250">
            <h3>${item.name}</h3>
            <p class="meta">${item.country} | ${item.category}</p>
            <p><strong>Best:</strong> ${item.bestTime}</p>
            <p>${item.description}</p>
            <button class="learnBtn" data-id="${item.id}">Learn More</button>
            <button class="wishBtn" data-id="${item.id}">♡ Save</button>
        </section>
    `).join('');

    container.innerHTML = html;

    container.querySelectorAll('.learnBtn').forEach(b => {
        b.addEventListener('click', e => {
            const item = allData.find(i => i.id === Number(e.target.dataset.id));
            modalContent.innerHTML = `
                <h2>${item.name}</h2>
                <img src="${item.image}" style="width:100%;border-radius:6px" loading="lazy">
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Best Time to Visit:</strong> ${item.bestTime}</p>
                <p><strong>What to Expect:</strong> ${item.expect}</p>
                <p><strong>Recommendation:</strong> ${item.recommendation}</p>
                <p><strong>Activities:</strong> ${item.activities.join(', ')}</p>
                <p>${item.description}</p>
            `;

            modal.showModal();
        });
    });

    container.querySelectorAll('.wishBtn').forEach(b => {
        b.addEventListener('click', e => {
            let saved = JSON.parse(localStorage.getItem('sadcWishlist')) || [];
            const id = Number(e.target.dataset.id);
            if (!saved.includes(id)) {
                saved.push(id);
            }
            localStorage.setItem('sadcWishlist', JSON.stringify(saved));
        });
    });

    document.querySelectorAll('.filter button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            if (f === 'all') display(allData);
            else display(allData.filter(item => item.category === f || item.country.includes(f)));
        });
    });

    document.getElementById('closeModal')?.addEventListener('click', () => modal.close());
}

fetchAttractions();
