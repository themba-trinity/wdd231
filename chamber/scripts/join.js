document.getElementById("timestamp").value = new Date().toISOString();
const modals = {
    np: document.getElementById("npModals"),
    bronze: document.getElementById("bronzeModals"),
    silver: document.getElementById("silverModals"),
    gold: document.getElementById("goldModals")
};

document.getElementById("openNP").addEventListener("click", () => modals.np.showModals()); 
document.getElementById("openBronze").addEventListener("click", () => modals.bronze.showModals());
document.getElementById("openSilver").addEventListener("click", () => modals.silver.showModals());
document.getElementById("openGold").addEventListener("click", () => modals.gold.showModals());

document.querySelectorAll(".closeModals").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});