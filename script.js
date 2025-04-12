const shows = [
  {
    "score": 0.9081671,
    "show": {
      "id": 139,
      "url": "https://www.tvmaze.com/shows/139/girls",
      "name": "Girls",
      "type": "Scripted",
      "language": "English",
      "genres": ["Drama", "Romance"],
      "status": "Ended",
      "premiered": "2012-04-15",
      "ended": "2017-04-16",
      "image": {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg"
      },
      "summary": "This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s."
    }
  },
  {
    "score": 0.89102745,
    "show": {
      "id": 41734,
      "url": "https://www.tvmaze.com/shows/41734/girls",
      "name": "GIRLS",
      "type": "Scripted",
      "language": "Mongolian",
      "genres": ["Comedy"],
      "status": "Ended",
      "premiered": "2018-06-15",
      "ended": "2019-10-14",
      "image": {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/191/478539.jpg"
      },
      "summary": "A Mongolian comedy series."
    }
  },
  {
    "score": 0.7008197,
    "show": {
      "id": 67594,
      "url": "https://www.tvmaze.com/shows/67594/dope-girls",
      "name": "Dope Girls",
      "type": "Scripted",
      "language": "English",
      "genres": ["Drama", "Crime", "History"],
      "status": "To Be Determined",
      "premiered": "2025-02-22",
      "image": {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/556/1390988.jpg"
      },
      "summary": "A story about a housewife who sets up a nightclub during WWI."
    }
  }
  // Agregar más series según lo que necesitas
];

const seriesContainer = document.getElementById("series-container");

function displayShows() {
  shows.forEach(show => {
    const showCard = document.createElement("div");
    showCard.classList.add("series-card");

    showCard.innerHTML = `
      <img src="${show.show.image.medium}" alt="${show.show.name}">
      <h3><a href="${show.show.url}" target="_blank">${show.show.name}</a></h3>
      <p><strong>Genres:</strong> ${show.show.genres.join(', ')}</p>
      <p><strong>Status:</strong> ${show.show.status}</p>
      <p>${show.show.summary}</p>
    `;

    seriesContainer.appendChild(showCard);
  });
}

displayShows();
