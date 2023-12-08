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

export function createPhotographerElement({
  id,
  name,
  city,
  country,
  portrait,
  tagline,
  price,
}) {
  const wrapper = createElement("article", "photographer_wrapper");
  const photographLink = createElement("a", "photographer_link", {
    href: `./photographer.html?id=${id}`,
    target: "_blank",
    ariaLabel: `Voir la page de ${name}`,
  });
  const photographImage = createElement("img", "photographer_image", {
    src: `./assets/Sample Photos/Photographers ID Photos/${portrait}`,
    alt: name,
  });
  const photographName = createElement("h2", "photographer_name", {}, name);
  const photographLocation = createElement(
    "p",
    "photographer_location",
    {},
    `${city}, ${country}`
  );
  const photographTagline = createElement(
    "p",
    "photographer_tagline",
    {},
    tagline
  );
  const photographPrice = createElement(
    "p",
    "photographer_price",
    {},
    `${price}€/jour`
  );

  photographLink.append(photographImage, photographName);
  wrapper.append(
    photographLink,
    photographLocation,
    photographTagline,
    photographPrice
  );

  return wrapper;
}
