async function getDataAndCreateElements() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const media = data.media;

  const photographerSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const wrapper = document.createElement("article");
    wrapper.classList.add("photographer_wrapper");

    const photographLink = document.createElement("a");
    photographLink.href = "./photographer.html?id=" + photographer.id;
    photographLink.classList.add("photographer_link");

    const photographImage = document.createElement("img");
    photographImage.classList.add("photographer_image");
    photographImage.src =
      "./assets/Sample Photos/Photographers ID Photos/" + photographer.portrait;
    photographImage.alt = photographer.name;

    const photographName = document.createElement("h2");
    photographName.classList.add("photographer_name");
    photographName.textContent = photographer.name;

    // Add the image and name to the link
    photographLink.appendChild(photographImage);
    photographLink.appendChild(photographName);

    const photographLocation = document.createElement("p");
    photographLocation.classList.add("photographer_location");
    photographLocation.textContent =
      photographer.city + ", " + photographer.country;
    photographLocation.setAttribute(
      "aria-label",
      photographer.city + ", " + photographer.country
    );

    const photographTagline = document.createElement("p");
    photographTagline.classList.add("photographer_tagline");
    photographTagline.textContent = photographer.tagline;

    const photographPrice = document.createElement("p");
    photographPrice.classList.add("photographer_price");
    photographPrice.textContent = photographer.price + "€/jour";

    // Add the link to the wrapper
    wrapper.appendChild(photographLink);
    wrapper.appendChild(photographLocation);
    wrapper.appendChild(photographTagline);
    wrapper.appendChild(photographPrice);

    photographerSection.appendChild(wrapper);
  });

  return { photographers, media };
}

getDataAndCreateElements();
