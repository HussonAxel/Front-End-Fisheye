import fetchData from "./api.js";
import * as PhotographerFactory from "../utils/photographerFunctionFactory.js";

const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));

let globalPhotographers = [];
let globalMedia = [];

async function initializePage() {
  try {
    const { photographers, media } = await fetchData();
    globalPhotographers = photographers;
    globalMedia = media.filter(
      (item) => item.photographerId === photographerId
    );

    const photographer = globalPhotographers.find(
      (p) => p.id === photographerId
    );
    if (!photographer) {
      throw new Error("Photographer not found");
    }

    PhotographerFactory.createPhotographerSection(photographer);

    PhotographerFactory.createMediaSections(globalMedia, photographer);
    PhotographerFactory.createStatsElement(globalMedia, photographerId);
    PhotographerFactory.openLightbox(globalMedia, photographer);
    PhotographerFactory.likeMedia(globalMedia, photographer);

    document.getElementById("tri").addEventListener("change", function (event) {
      PhotographerFactory.sortBy(event.target.value, photographer, globalMedia);
    });
  } catch (error) {
    console.error("Error in initializePage:", error);
    return null;
  }
}

initializePage();
