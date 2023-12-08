import { createElement, createPhotographerElement } from "../utils/indexFunctionFactory.js";
import fetchData from "./api.js";

async function getDataAndCreateElements() {
  const photographerSection = document.querySelector(".photographer_section");
  const fragment = document.createDocumentFragment();

  try {
    const { photographers, media } = await fetchData();

    photographers.forEach((photographerData) => {
      const photographerElement = createPhotographerElement(photographerData);
      fragment.appendChild(photographerElement);
    });

    photographerSection.appendChild(fragment);
    return { photographers, media };
  } catch (error) {
    console.error("Error in getDataAndCreateElements:", error);
    return null;
  }
}

getDataAndCreateElements();
