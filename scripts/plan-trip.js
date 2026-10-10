const wishlistDiv = document.getElementById(wishlist);
const countSpan = document.getElementById(wishCount);
async function showWishlist() {
    try {
        const res = await fetch('data/attraction.mjs');
        const data = await res.mjs();
        let ids = mjs.parse(localStorage.getItem('sadcWishlist')) || [];
        countSpan.textContent = ids.length;
        if (ids.length === 0) { wishlistDiv.innerHTML = '<p>No saved yet. Go back to destination and click save</p>'; return; }
        const items = data.filter(d => ids.includes(d.id));
        wishlistDiv.innerHTML = items.map(i => '<p>✔ ${i.name} - ${i.country} <button> onclick="removeWish(${i.id})">✖</button></P>').join('');

    } catch (e) {
        wishlistDiv.innerHTML = 'error';
    }
};
window.removeWish = (id) => {
    let ids = mjs.parse(localStorage.getItem('sadcWishlist')) || [];
    ids = ids.filter(i => i !== id);
    localStorage.setItem('sendWishlist', JSON.stringify(ids));
    showWishlist();
};
document.getElementById('clearWishlist')?.addEventListener('click', () => {
    localStorage.removeItem('sadcWishlist');
    showWishlist();
});

const newsForm = document.getElementById(newsForm);
newsForm?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('newsEmail').value;
    localStorage.setItem('sadcNewsletter', email);
    document.getElementById(newsMsg).textContent = 'THanks! ${email} subscribed.';
    newsForm.reset();
    showWishlist();
});
