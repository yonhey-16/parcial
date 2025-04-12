const showsData = [
    {
        "score": 0.9081671,
        "show": {
            "id": 139,
            "url": "https://www.tvmaze.com/shows/139/girls",
            "name": "Girls",
            "image": {
                "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg"
            },
            "summary": "This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.",
            "rating": {
                "average": 6.4
            }
        }
    },
    {
        "score": 0.89102745,
        "show": {
            "id": 41734,
            "url": "https://www.tvmaze.com/shows/41734/girls",
            "name": "GIRLS",
            "image": {
                "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/191/478539.jpg"
            },
            "summary": "A Mongolian comedy series about the adventures of girls.",
            "rating": {
                "average": null
            }
        }
    },
    {
        "score": 0.7008197,
        "show": {
            "id": 67594,
            "url": "https://www.tvmaze.com/shows/67594/dope-girls",
            "name": "Dope Girls",
            "image": {
                "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/556/1390988.jpg"
            },
            "summary": "As WWI ends, housewife Kate Galloway sets up a nightclub in Soho to support her daughters.",
            "rating": {
                "average": 5.2
            }
        }
    },
    // Add more shows here...
];

function displayShows(shows) {
    const showsList = document.getElementById("shows-list");
    showsList.innerHTML = ''; // Clear the list before rendering

    shows.forEach(showItem => {
        const show = showItem.show;
        const showCard = document.createElement("div");
        showCard.classList.add("show-card");

        showCard.innerHTML = `
            <img src="${show.image.medium}" alt="${show.name}">
            <div class="content">
                <div class="title"><a href="${show.url}" target="_blank">${show.name}</a></div>
                <div class="summary">${show.summary}</div>
                <div class="rating">Rating: ${show.rating.average ? show.rating.average : 'N/A'}</div>
            </div>
        `;

        showsList.appendChild(showCard);
    });
}

// Display the shows on page load
window.onload = () => {
    displayShows(showsData);
};
