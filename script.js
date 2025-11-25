// Fetch database
async function getData() {
    const response = await fetch("data.json");
    return response.json();
}

// Load all destinations as cards
async function loadDestinations() {
    const data = await getData();
    const list = document.getElementById("destination-list");

    data.destinations.forEach((dest, i) => {
        list.innerHTML += `
            <div class="card" style="animation-delay:${i * 0.2}s">
                <img src="${dest.image}">
                <div class="card-body">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                    <a class="button" href="destination.html?id=${dest.id}">Explore</a>
                </div>
            </div>
        `;
    });
}

// Load single destination page
async function loadSingleDestination() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const data = await getData();
    const dest = data.destinations.find(d => d.id == id);

    const container = document.getElementById("destination-details");

    container.innerHTML = `
        <h2>${dest.name}</h2>
        <img class="details-img" src="${dest.image}">
        <p><strong>Location:</strong> ${dest.location}</p>
        <p style="margin-top:10px">${dest.details}</p>
    `;
}
// Fetch database
async function getData() {
    const response = await fetch("data.json");
    return response.json();
}

// Load all destinations as cards
async function loadDestinations() {
    const data = await getData();
    const list = document.getElementById("destination-list");

    data.destinations.forEach((dest, i) => {
        list.innerHTML += `
            <div class="card" style="animation-delay:${i * 0.2}s">
                <img src="${dest.image}">
                <div class="card-body">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                    <a class="button" href="destination.html?id=${dest.id}">Explore</a>
                </div>
            </div>
        `;
    });
}

// Load single destination page
async function loadSingleDestination() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const data = await getData();
    const dest = data.destinations.find(d => d.id == id);

    const container = document.getElementById("destination-details");

    container.innerHTML = `
        <h2>${dest.name}</h2>
        <img class="details-img" src="${dest.image}">
        <p><strong>Location:</strong> ${dest.location}</p>
        <p style="margin-top:10px">${dest.details}</p>
    `;
}
// Dark Mode Toggle
const darkToggle = document.getElementById("darkToggle");
if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
}
async function enableSearch(data) {
    const search = document.getElementById("searchBox");
    const list = document.getElementById("destination-list");

    search.addEventListener("keyup", () => {
        const text = search.value.toLowerCase();
        list.innerHTML = "";

        data.destinations
            .filter(d => d.name.toLowerCase().includes(text) || d.location.toLowerCase().includes(text))
            .forEach(dest => {
                list.innerHTML += `
                    <div class="card">
                        <img src="${dest.image}">
                        <div class="card-body">
                            <h3>${dest.name}</h3>
                            <p>${dest.description}</p>
                            <a class="button" href="destination.html?id=${dest.id}">Explore</a>
                        </div>
                    </div>
                `;
            });
    });
}

async function loadDestinations() {
    const data = await getData();
    const list = document.getElementById("destination-list");

    // Load first time
    data.destinations.forEach(dest => {
        list.innerHTML += `
            <div class="card">
                <img src="${dest.image}">
                <div class="card-body">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                    <a class="button" href="destination.html?id=${dest.id}">Explore</a>
                </div>
            </div>
        `;
    });

    // Search functionality
    enableSearch(data);
}
// Scroll Animation Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

document.querySelectorAll(".scroll-anim").forEach(el => observer.observe(el));
async function enableAdvancedSearch(data) {
    const box = document.getElementById("searchBox");
    const list = document.getElementById("destination-list");
    const sug = document.getElementById("suggestions");

    box.addEventListener("input", () => {
        const text = box.value.toLowerCase();
        sug.innerHTML = "";
        sug.style.display = "none";

        if (text.length === 0) return;

        const results = data.destinations.filter(d =>
            d.name.toLowerCase().includes(text) ||
            d.location.toLowerCase().includes(text) ||
            d.description.toLowerCase().includes(text)
        );

        if (results.length > 0) {
            sug.style.display = "block";

            results.forEach(r => {
                const div = document.createElement("div");
                div.style.padding = "10px";
                div.style.cursor = "pointer";
                div.innerHTML = `<b>${r.name}</b> — ${r.location}`;
                div.onclick = () => {
                    box.value = r.name;
                    sug.style.display = "none";
                    showResults([r]);
                };
                sug.appendChild(div);
            });
        }

        showResults(results);
    });

    function showResults(results) {
        list.innerHTML = "";
        if (results.length === 0) {
            list.innerHTML = `<p style="padding:20px;">No destinations found.</p>`;
        }

        results.forEach(dest => {
            list.innerHTML += `
                <div class="card scroll-anim">
                    <img src="${dest.image}">
                    <div class="card-body">
                        <h3>${dest.name}</h3>
                        <p>${dest.description}</p>
                        <a class="button" href="destination.html?id=${dest.id}">Read More</a>
                    </div>
                </div>
            `;
        });
    }
}
