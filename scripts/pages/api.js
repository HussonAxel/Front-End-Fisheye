async function fetchData() {
  try {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const photographers = data.photographers;
    const media = data.media;

    return { data, photographers, media };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default fetchData;
