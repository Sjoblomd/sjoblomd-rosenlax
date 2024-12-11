const menuLinks = [
    { name: "Start", href: "../Start/Index.html" },
    { name: "Memory Game", href: "../MemoryGame/index.html" },
    { name: "RPS Game", href: "../RPSGame/RPS.html" },
    { name: "Gallery", href: "../Gallery/gallery.html" }
];

function generateMenu() {
    const navList = document.getElementById("nav-list");

    menuLinks.forEach(link => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");

        anchor.href = link.href;
        anchor.textContent = link.name;

        listItem.appendChild(anchor);
        navList.appendChild(listItem);
    });
}

function toggleMenu() {
    const nav = document.getElementById("nav");
    nav.classList.toggle("open");
}

document.getElementById("hamburger-menu").addEventListener("click", toggleMenu);

generateMenu();
