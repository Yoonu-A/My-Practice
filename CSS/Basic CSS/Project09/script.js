function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("show");
}

function searchTopic() {

    let search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let links = document.querySelectorAll("#sidebar a");

    links.forEach(function(link) {

        let text = link.textContent.toLowerCase();

        if (text.includes(search)) {
            link.style.display = "block";
        } else {
            link.style.display = "none";
        }

    });
}