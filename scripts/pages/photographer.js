const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));

let globalPhotographers = [];
let globalMedia = [];

async function initializePage() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  globalPhotographers = data.photographers;
  globalMedia = data.media;

  const photographer = globalPhotographers.find((p) => p.id === photographerId);
  createPhotographerSection(photographer);
  createMediaSections(globalMedia, photographer);
  createStatsElement(globalMedia, photographerId);

  return { globalPhotographers, globalMedia };
}

function createPhotographerSection(photographer) {
  const photographerSection = document.querySelector(".photograph-header");
  const photographerWrapper = document.createElement("div");
  photographerWrapper.classList.add("photographer_wrapper");

  const photographName = document.createElement("h1");
  photographName.className = "photographer_name";
  photographName.textContent = photographer.name;

  const photographLocation = document.createElement("p");
  photographLocation.className = "photographer_location";
  photographLocation.textContent = `${photographer.city}, ${photographer.country}`;

  const photographTagline = document.createElement("p");
  photographTagline.className = "photographer_tagline";
  photographTagline.textContent = photographer.tagline;

  const photographImage = document.createElement("img");
  photographImage.className = "photographer_image";
  photographImage.src = `./assets/Sample Photos/Photographers ID Photos/${photographer.portrait}`;
  photographImage.alt = photographer.name;

  const photographPrice = document.querySelector(".photographerPrice");
  photographPrice.textContent = `${photographer.price}€/jour`;
  photographerWrapper.append(
    photographName,
    photographLocation,
    photographTagline
  );

  photographerSection.append(
    photographImage,
    document.querySelector(".contact_button"),
    photographerWrapper
  );
}

function createMediaSections(media, photographer) {
  const mediaSection = document.querySelector(".media_section");
  media
    .filter((item) => item.photographerId === photographer.id)
    .forEach((item) => {
      const mediaWrapper = createMediaElement(item, photographer);
      mediaSection.appendChild(mediaWrapper);
    });
}

function createMediaElement(mediaItem, photographer) {
  const mediaWrapper = document.createElement("article");
  mediaWrapper.className = "media_wrapper";

  const mediaLink = document.createElement("a");
  mediaLink.className = "media_link";

  const firstName = photographer.name.split(" ")[0];
  const mediaElement = mediaItem.image
    ? createImageElement(mediaItem, firstName)
    : createVideoElement(mediaItem, firstName);

  const mediaData = document.createElement("div");
  mediaData.className = "media_data";

  const mediaTitle = document.createElement("h2");
  mediaTitle.className = "media_title";
  mediaTitle.textContent = mediaItem.title;

  const mediaLikes = document.createElement("p");
  mediaLikes.className = "media_likes";
  mediaLikes.textContent = mediaItem.likes;

  const mediaLikesIcon = document.createElement("img");
  mediaLikesIcon.src = "./assets/images/red_like.png";

  mediaLikes.appendChild(mediaLikesIcon);
  mediaData.append(mediaTitle, mediaLikes);

  mediaLink.appendChild(mediaElement);
  mediaWrapper.append(mediaLink, mediaData);

  return mediaWrapper;
}

function createImageElement(mediaItem, firstName) {
  const image = document.createElement("img");
  image.className = "media_image";
  image.src = `./assets/Sample Photos/${firstName}/${mediaItem.image}`;
  image.alt = mediaItem.title;
  image.onclick = function () {
    openLightbox(mediaItem.image);
  };

  return image;
}

function createVideoElement(mediaItem, firstName) {
  const video = document.createElement("video");
  video.className = "media_image";
  video.src = `./assets/Sample Photos/${firstName}/${mediaItem.video}`;
  video.title = mediaItem.title;
  video.controls = true;
  video.onclick = function () {
    openLightbox(mediaItem.video);
  };

  return video;
}

function createStatsElement(media, photographerId) {
  const totalLikes = media
    .filter((item) => item.photographerId === photographerId)
    .reduce((acc, item) => acc + item.likes, 0);
  const mediaLikesIcon = document.createElement("img");
  mediaLikesIcon.className = "total_like_icon";
  mediaLikesIcon.src = "./assets/images/black_like.png";

  const totalLikesElement = document.querySelector(".totalLikes");
  totalLikesElement.textContent = totalLikes;
  totalLikesElement.appendChild(mediaLikesIcon);
}

function sortBy(arg) {
  const photographer = globalPhotographers.find((p) => p.id === photographerId);

  let sortedMedia = [...globalMedia].filter(
    (item) => item.photographerId === photographer.id
  );

  if (arg === "Popularité") {
    sortedMedia.sort((a, b) => b.likes - a.likes);
  } else if (arg === "Date") {
    sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
  }

  document.querySelector(".media_section").innerHTML = "";
  createMediaSections(sortedMedia, photographer);
}

function openLightbox(src, photographer) {
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("lightboxImage").src = `./assets/Sample Photos/${
    photographer.name.split(" ")[0]
  }/${src}`;
  currentIndex = findMediaIndex(src);
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

let currentIndex = 0;

function findMediaIndex(src) {
  // Assuming globalMedia is an array of media items
  return globalMedia.findIndex(
    (item) => item.image === src || item.video === src
  );
}

function changeImage(step) {
  currentIndex += step;
  if (currentIndex >= globalMedia.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = globalMedia.length - 1;
  }

  const newMedia = globalMedia[currentIndex];
  const newSrc = newMedia.image ? newMedia.image : newMedia.video;
  document.getElementById("lightboxImage").src = `./assets/Sample Photos/${
    photographer.name.split(" ")[0]
  }/${newSrc}`;
}
// Call this function on page load
initializePage();



