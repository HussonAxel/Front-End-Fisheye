export function createElement(
  type,
  className,
  attributes = {},
  textContent = ""
) {
  const element = document.createElement(type);
  element.className = className;
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  if (textContent) element.textContent = textContent;
  return element;
}

export function createPhotographerSection(photographer) {
  const photographerSection = document.querySelector(".photograph-header");
  const photographerWrapper = createElement("div", "photographer_wrapper");

  const photographName = createElement(
    "h1",
    "photographer_name",
    {},
    photographer.name
  );
  const photographLocation = createElement(
    "p",
    "photographer_location",
    {},
    `${photographer.city}, ${photographer.country}`
  );
  const photographTagline = createElement(
    "p",
    "photographer_tagline",
    {},
    photographer.tagline
  );
  const photographImage = createElement("img", "photographer_image", {
    src: `./assets/Sample Photos/Photographers ID Photos/${photographer.portrait}`,
    alt: photographer.name,
  });

  const photographPrice = document.querySelector(".photographerPrice");
  photographPrice.textContent = `${photographer.price}€/jour`;

  photographerWrapper.append(
    photographName,
    photographLocation,
    photographTagline
  );
  photographerSection.append(
    photographerWrapper,
    document.querySelector(".contact_button"),
    photographImage
  );
}

export function createMediaSections(media, photographer) {
  const mediaSection = document.querySelector(".media_section");
  media
    .filter((item) => item.photographerId === photographer.id)
    .forEach((item) => {
      const mediaWrapper = createMediaElement(item, photographer);
      mediaSection.appendChild(mediaWrapper);
    });
}

export function createMediaElement(mediaItem, photographer) {
  const mediaWrapper = createElement("article", "media_wrapper");
  const mediaLink = createElement("a", "media_link");

  const firstName = photographer.name.split(" ")[0];
  const mediaElement = mediaItem.image
    ? createImageElement(mediaItem, firstName)
    : createVideoElement(mediaItem, firstName);

  const mediaTitle = createElement("h2", "media_title", {}, mediaItem.title);

  const mediaLikesWrapper = createElement("p", "media_likes_wrapper");
  const mediaLikes = createElement(
    "span",
    "media_likes",
    {},
    mediaItem.likes.toString()
  );
  const mediaLikesIcon = createElement("img", "likes", {
    src: "./assets/images/red_like.png",
    tabindex: "0",
    "aria-label": `${mediaItem.likes} likes`,
  });
  mediaLikesWrapper.appendChild(mediaLikes);
  mediaLikesWrapper.appendChild(mediaLikesIcon);
  const mediaData = createElement("div", "media_data");
  mediaData.append(mediaTitle, mediaLikesWrapper);

  mediaLink.appendChild(mediaElement);
  mediaWrapper.append(mediaLink, mediaData);

  return mediaWrapper;
}

export function createImageElement(mediaItem, firstName) {
  return createElement("img", "media_image", {
    src: `./assets/Sample Photos/${firstName}/${mediaItem.image}`,
    alt: mediaItem.title,
    href: `./assets/Sample Photos/${firstName}/${mediaItem.image}`,
    tabindex: "0",
  });
}

export function createVideoElement(mediaItem, firstName) {
  return createElement("video", "media_image", {
    src: `./assets/Sample Photos/${firstName}/${mediaItem.video}`,
    title: mediaItem.title,
    href: `./assets/Sample Photos/${firstName}/${mediaItem.video}`,
    tabindex: "0",
  });
}

export function createStatsElement(media, photographerId) {
  const totalLikes = media
    .filter((item) => item.photographerId === photographerId)
    .reduce((acc, item) => acc + item.likes, 0);

  const totalLikesWrapper = createElement("p", "total_likes_wrapper");
  const totalLikesP = createElement(
    "p",
    "total_likes",
    {},
    totalLikes.toString()
  );
  const totalLikesIcon = createElement("img", "likes", {
    src: "./assets/images/black_like.png",
  });

  totalLikesWrapper.appendChild(totalLikesP);
  totalLikesWrapper.appendChild(totalLikesIcon);
  const statsElement = document.querySelector(".photograph_stats");
  statsElement.appendChild(totalLikesWrapper);
}

export function sortBy(arg, photographer, globalMedia) {
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

  const mediaSection = document.querySelector(".media_section");
  mediaSection.innerHTML = "";
  createMediaSections(sortedMedia, photographer);
}

export function updateLikes(element, increment) {
  const currentLikes = parseInt(element.textContent);
  element.textContent = currentLikes + increment;
}

export function likeMedia() {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("likes")) {
      handleLike(event);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Enter" &&
      document.activeElement.classList.contains("likes")
    ) {
      handleLike(event);
    }
  });
}

function handleLike(event) {
  const closestElement = event.target.closest(".media_likes_wrapper");
  const totalLikesWrapper = document.querySelector(".total_likes");

  if (closestElement) {
    const mediaLikes = closestElement.querySelector(".media_likes");
    const increment = closestElement.classList.contains("liked") ? -1 : 1;

    updateLikes(mediaLikes, increment);
    updateLikes(totalLikesWrapper, increment);

    closestElement.classList.toggle("liked");
  }
}

export function openLightbox(media, photographer) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");
  const closeLightboxButton = document.getElementById("close-lightbox");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");

  lightbox.style.display = "none";
  lightboxImg.style.display = "none";
  lightboxVideo.style.display = "none";

  function handleMediaOpen(mediaElement) {
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "none";

    const lightboxMediaName = document.getElementById("lightbox-media-name");
    if (mediaElement.tagName === "IMG") {
      lightboxImg.src = mediaElement.src;
      lightboxImg.alt = mediaElement.alt;
      lightboxImg.style.display = "block";
      lightboxMediaName.textContent = mediaElement.alt;
    } else if (mediaElement.tagName === "VIDEO") {
      lightboxVideo.src = mediaElement.src;
      lightboxVideo.style.display = "block";
      lightboxMediaName.textContent = mediaElement.title;
    }
    lightbox.style.display = "flex";
    closeLightboxButton.focus();
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("media_image")) {
      handleMediaOpen(event.target);
    }
  });

  document.addEventListener("keydown", function (event) {
    console.log("Keydown event triggered");
    if (
      event.key === "Enter" &&
      document.activeElement.classList.contains("media_image")
    ) {
      // change the display of the lightbox from none to flex 

      handleMediaOpen(document.activeElement);
    }
  });
  // document.addEventListener("click", function (event) {
  //     if (event.target.classList.contains("media_image")) {
  //         lightboxImg.style.display = "none";
  //         lightboxVideo.style.display = "none";

  //         const lightboxMediaName = document.getElementById("lightbox-media-name");
  //         if (event.target.tagName === "IMG") {
  //           lightboxImg.src = event.target.src;
  //           lightboxImg.alt = event.target.alt;
  //           lightboxImg.style.display = "block";
  //           lightboxMediaName.textContent = event.target.alt;
  //         } else if (event.target.tagName === "VIDEO") {
  //           lightboxVideo.src = event.target.src;
  //           lightboxVideo.style.display = "block";
  //           lightboxMediaName.textContent = event.target.title;
  //         }
  //         lightbox.style.display = "flex";
  //         if (lightbox.style.display === "flex") {
  //           closeLightboxButton.focus();
  //         }
  //       }
  //   });

  // document.addEventListener("keydown", function (event) {
  //   if (event.key === "Enter" && document.activeElement.classList.contains("media_image")) {
  //     // lightboxImg.style.display = "none";
  //     // lightboxVideo.style.display = "none";

  //     // const lightboxMediaName = document.getElementById("lightbox-media-name");
  //     // const activeElement = document.activeElement;
  //     // if (activeElement.tagName === "IMG") {
  //     //   lightboxImg.src = activeElement.src;
  //     //   lightboxImg.alt = activeElement.alt;
  //     //   lightboxImg.style.display = "block";
  //     //   lightboxMediaName.textContent = activeElement.alt;
  //     // } else if (activeElement.tagName === "VIDEO") {
  //     //   lightboxVideo.src = activeElement.src;
  //     //   lightboxVideo.style.display = "block";
  //     //   lightboxMediaName.textContent = activeElement.title;
  //     // }
  //     // lightbox.style.display = "flex";
  //     // closeLightboxButton.focus();
  //     console.log("test");
  //   }
  // });

  closeLightboxButton.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      lightbox.style.display = "none";
    }
  });

  function navigateLightbox(direction) {
    const lightboxMediaName = document.getElementById("lightbox-media-name");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxVideo = document.getElementById("lightbox-video");
    const currentMediaName = lightboxMediaName.textContent;
    const currentMediaIndex = media.findIndex(
      (item) => item.title === currentMediaName
    );
    const mediaCount = media.length;
    let newIndex;

    if (direction === "left") {
      newIndex = (currentMediaIndex - 1 + mediaCount) % mediaCount;
    } else {
      newIndex = (currentMediaIndex + 1) % mediaCount;
    }

    const newMedia = media[newIndex];
    const photographerFirstName = photographer.name.split(" ")[0];
    const newMediaSrc = newMedia.image
      ? `./assets/Sample Photos/${photographerFirstName}/${newMedia.image}`
      : `./assets/Sample Photos/${photographerFirstName}/${newMedia.video}`;

    if (newMedia.image) {
      lightboxImg.src = newMediaSrc;
      lightboxImg.alt = newMedia.title;
      lightboxImg.style.display = "block";
      lightboxVideo.style.display = "none";
    } else {
      lightboxVideo.src = newMediaSrc;
      lightboxVideo.style.display = "block";
      lightboxImg.style.display = "none";
    }

    lightboxMediaName.textContent = newMedia.title;
  }

  leftArrow.addEventListener("click", function () {
    navigateLightbox("left");
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      navigateLightbox("left");
    }
  });

  rightArrow.addEventListener("click", function () {
    navigateLightbox("right");
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      navigateLightbox("right");
    }
  });
}
