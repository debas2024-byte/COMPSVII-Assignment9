
const form = document.getElementById("gif-form");
const container = document.getElementById("gif-container");
const statusMessage = document.getElementById("status-message");

async function fetchGifs(searchTerm, apiKey) {
  const url = new URL("https://api.giphy.com/v1/gifs/search");

  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("q", searchTerm);
  url.searchParams.set("limit", "9");
  url.searchParams.set("rating", "g");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not fetch GIFs. Check your API key.");
  }

  const result = await response.json();
  return result.data;
}

function displayGifs(gifs) {
  container.innerHTML = "";

  gifs.forEach((gif) => {
    const image = document.createElement("img");

    image.src = gif.images.fixed_height.url;
    image.alt = gif.title || "Giphy GIF";
    image.loading = "lazy";

    container.appendChild(image);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = document.getElementById("search-input").value.trim();
  const apiKey = document.getElementById("api-key").value.trim();

  if (!searchTerm || !apiKey) {
    statusMessage.textContent = "Enter a search and API key.";
    return;
  }

  statusMessage.textContent = "Loading GIFs...";
  container.innerHTML = "";

  try {
    const gifs = await fetchGifs(searchTerm, apiKey);
    displayGifs(gifs);

    statusMessage.textContent = gifs.length
      ? `Found ${gifs.length} GIFs!`
      : "No GIFs found. Try another search.";
  } catch (error) {
    statusMessage.textContent = error.message;
  }
});
