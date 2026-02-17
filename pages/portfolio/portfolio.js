const url = `https://cdn.contentful.com/spaces/f2hj6ibejbaj/environments/master/entries?access_token=Q9pjpmP1ad7nLBaPHKLm3KcXZJ0LgWiPum4IuDs73LY&content_type=pagePortfolio&include=3`;
const urlWork = `https://cdn.contentful.com/spaces/f2hj6ibejbaj/environments/master/entries?access_token=Q9pjpmP1ad7nLBaPHKLm3KcXZJ0LgWiPum4IuDs73LY&content_type=workSection&include=3`;

async function getPortfolio() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error trayendo datos");
    }

    const data = await response.json();

    const container = document.getElementById("portfolio");

    data.items.forEach(item => {


      const title = item.fields.title.content[0].content[0].value;
      const imageId = item.fields.imagen.sys.id;

      const asset = data.includes.Asset.find(
        asset => asset.sys.id === imageId
      );

      const imageUrl = asset.fields.file.url;

      const div = document.createElement("div");
      div.classList.add("portfolio-card");

      div.innerHTML = `
      <div class = "texto">
        <h2 class="Title-portfolio">${title} 
        <span class="text-servicios">Servicios</span>
        </h2>
        <img class="maletin" src="https:${imageUrl}" alt="${title}">
        </div>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {

  const response = await fetch(urlWork);
  const data = await response.json();

  console.log("DATA:", data);

  const container = document.getElementById("trabajos-container");

  const workSection = data.items[0];

  const cardsRefs = workSection.fields.cardswork;

  cardsRefs.forEach(ref => {

    const card = data.includes.Entry.find(
      entry => entry.sys.id === ref.sys.id
    );

    if (!card) return;

    const title = card.fields.title;
console.log("CARD:", card.fields);

   let imageUrl = "";

const assets = data.includes?.Asset || [];

if (card.fields.image?.length > 0) {

  const imageId = card.fields.image[0].sys.id;

  const asset = assets.find(
    asset => asset.sys.id === imageId
  );

  if (asset?.fields?.file?.url) {
    imageUrl = `https:${asset.fields.file.url}`;
  }
}

let description = "";

if (card.fields.description?.content?.length > 0) {
  description =
    card.fields.description.content[0].content[0].value;
}


    const div = document.createElement("div");
    div.innerHTML = `
    <div class="work-card">
      <img class="imagenwork" src="${imageUrl}">
      <h3 class="titlework">${title}</h3>
       <p class="descriptionwork">${description}</p>
       </div>
    `;

    container.appendChild(div);
  });

});

getPortfolio();


async function loadComponent(id, file, scriptFile = 0) {
  const response = await fetch(file);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;

  if (scriptFile) {
    const script = document.createElement("script");
    script.src = scriptFile;
    script.defer = true;
    document.body.appendChild(script);
  }
}

loadComponent("header", "components/header.html", "components/header.js");
loadComponent("footer", "components/footer.html");