const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));

async function getDataAndCreateElements() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const media = data.media;

  const photographer = photographers.find((p) => p.id === photographerId);
  photographerModule.createSection(photographer);
  mediaModule.createSection(media, photographer);
  mediaModule.createStatsElement(media);

  return { photographers, media };
}

const photographerModule = {
  createSection: (photographer) => {
    console.log("photographer", photographer);
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
  },
};

const mediaModule = {
  createSection: (media, photographer) => {
    const mediaSection = document.querySelector(".media_section");
    media
      .filter((item) => item.photographerId === photographer.id)
      .forEach((item) => {
        const mediaWrapper = mediaModule.createMediaElement(item, photographer);
        mediaSection.appendChild(mediaWrapper);
      });
  },

  createMediaElement: (mediaItem, photographer) => {
    const mediaWrapper = document.createElement("article");
    mediaWrapper.className = "media_wrapper";

    const mediaLink = document.createElement("a");
    mediaLink.href = `./photographer.html?id=${photographer.id}`;
    mediaLink.className = "media_link";

    const firstName = photographer.name.split(" ")[0];
    const mediaElement = mediaItem.image
      ? mediaModule.createImageElement(mediaItem, firstName)
      : mediaModule.createVideoElement(mediaItem, firstName);

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
  },

  createImageElement: (mediaItem, firstName) => {
    const image = document.createElement("img");
    image.className = "media_image";
    image.src = `./assets/Sample Photos/${firstName}/${mediaItem.image}`;
    image.alt = mediaItem.title;
    return image;
  },

  createVideoElement: (mediaItem, firstName) => {
    const video = document.createElement("video");
    video.className = "media_image";
    video.src = `./assets/Sample Photos/${firstName}/${mediaItem.video}`;
    video.title = mediaItem.title;
    video.controls = true;
    return video;
  },

  createStatsElement: (media) => {
    const totalLikes = media
      .filter((item) => item.photographerId === photographerId)
      .reduce((acc, item) => acc + item.likes, 0);
      console.log(totalLikes)

      const mediaLikesIcon = document.createElement("img");
      mediaLikesIcon.className = "total_like_icon";
      mediaLikesIcon.src = "./assets/images/black_like.png";


    const totalLikesElement = document.querySelector(".totalLikes");
    totalLikesElement.textContent = totalLikes;
    totalLikesElement.appendChild(mediaLikesIcon);


  },
};

async function sortBy(arg, media) {
  if (arg === "popularity") {
    media.sort((a, b) => b.likes - a.likes);
  } else if (arg === "date") {
    media.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (arg === "title") {
    media.sort((a, b) => a.title.localeCompare(b.title));
  }
}

getDataAndCreateElements();
