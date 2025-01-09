// Dynamic Content Loading
document.addEventListener("DOMContentLoaded", () => {
    // Load games, movies, and TV shows dynamically
    loadContent("games-section", "data/games.json");
    loadContent("movies-section", "data/movies.json");
    loadContent("tv-shows-section", "data/tvshows.json");
});

// Function to load content dynamically
function loadContent(sectionId, dataFile) {
    fetch(dataFile)
        .then((response) => response.json())
        .then((data) => {
            const section = document.getElementById(sectionId);
            const container = section.querySelector("div");
            container.innerHTML = ""; // Clear default content

            data.forEach((item) => {
                const card = document.createElement("div");
                card.style.position = "relative";
                card.style.width = "150px";
                card.style.height = "200px";
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; border-radius: 8px; object-fit: cover;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); color: #fff;
                        display: flex; flex-direction: column; justify-content: center; align-items: center;
                        opacity: 0; border-radius: 8px; transition: opacity 0.3s;">
                        <p>${item.details}</p>
                    </div>
                `;
                card.addEventListener("mouseenter", () => {
                    card.querySelector("div").style.opacity = 1;
                });
                card.addEventListener("mouseleave", () => {
                    card.querySelector("div").style.opacity = 0;
                });
                container.appendChild(card);
            });
        })
        .catch((error) => console.error(`Failed to load ${dataFile}:`, error));
}

// Spotify Integration
function updateSpotifyEmbed() {
    fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            Authorization: `Bearer YOUR_SPOTIFY_ACCESS_TOKEN`, // Replace with your token
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch currently playing song");
            }
            return response.json();
        })
        .then((data) => {
            const spotifySection = document.getElementById("spotify-section");
            spotifySection.innerHTML = `
                <iframe src="https://open.spotify.com/embed/track/${data.item.id}" 
                    width="100%" height="150" frameborder="0" style="border-radius: 12px;"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                </iframe>
            `;
        })
        .catch((error) => console.error("Spotify API Error:", error));
}

// Call updateSpotifyEmbed every 30 seconds to refresh the embed
setInterval(updateSpotifyEmbed, 30000);
updateSpotifyEmbed();
