const spaceId = 'f2hj6ibejbaj';
const accessToken = 'Q9pjpmP1ad7nLBaPHKLm3KcXZJ0LgWiPum4IuDs73LY';

const url = `https://cdn.contentful.com/spaces/f2hj6ibejbaj/environments/master/entries?access_token=Q9pjpmP1ad7nLBaPHKLm3KcXZJ0LgWiPum4IuDs73LY&include=10`;


fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la red');
    }
    return response.json();
  })
  .then(data => {
    // Bienvenida
    const bienvenidaEntry = data.items.find(item => item.fields.soyIvan === 'Soy Ivan');
    if (bienvenidaEntry) {
      const title = bienvenidaEntry.fields.soyIvan;
      const imageUrl = bienvenidaEntry.fields.cohete?.fields?.file?.url || '/cohete.png';
      const bienvenidaHTML = `
        <div class="bienvenida">
          <img src="${imageUrl}" alt="${title}">
          <h1>${title}</h1>
        </div>
      `;
      document.getElementById('bienvenida-container').innerHTML = bienvenidaHTML;
    } else {
      console.error('No se encontró la entrada de Bienvenida');
    }

    // Presentación
    const presentacion = data.items.find(item => item.fields.soyIvan === 'Soy Ivan');
    if (presentacion) {
      const ivanAssetId = presentacion.fields.ivan?.sys?.id;
      const ivanAsset = data.includes?.Asset.find(asset => asset.sys.id === ivanAssetId);
      const imageUrl = ivanAsset ? ivanAsset.fields.file.url : '/Mi Foto Ivan.png';
      const descripcion = presentacion.fields.descripcion?.content?.[0]?.content?.[0]?.value || '';
      const presentacionHTML = `
        <div class="presentacion">
          <div class="texto">
            <h2>${presentacion.fields.soyIvan}</h2>
            <p>${descripcion}</p>
          </div>
          <img src="${imageUrl}" alt="Imagen de Presentación">
        </div>
      `;
      document.getElementById('presentacion-container').innerHTML = presentacionHTML;
    } else {
      console.error('No se encontró la entrada de presentación');
    }

    // Portfolio
   // SERVICES SECTION
   console.log(
  data.items.map(item => item.sys.contentType.sys.id)
  )


const servicesSection = data.items.find(
  item => item.sys.contentType.sys.id === 'servicesSection'
);

if (!servicesSection) {
  console.error('No se encontró ServicesSection');
  return;
}

console.log('ServicesSection fields:', servicesSection.fields);

const sectionTitle = servicesSection.fields.title || 'Servicios';

// Resolver cards linkeadas
const cards = (servicesSection.fields.tarjetas || [])
  .map(link =>
    data.items.find(item => item.sys.id === link.sys.id)
  )
  .filter(Boolean);

const cardsHTML = cards.map(card => {
  const title = card.fields.title || '';
  const description =
    card.fields.description?.content?.[0]?.content?.[0]?.value || '';

  // Resolver imágenes
  const images = (card.fields.image || [])
  .map(imgLink => {
    return data.includes.Asset.find(
      asset => asset.sys.id === imgLink.sys.id
    );
  })
  .filter(Boolean);
console.log(card.fields.images);
console.log('FIELDS DE LA CARD:', card.fields);


const imagesHTML = images.map(img => `
  <img 
    src="https:${img.fields.file.url}" 
    alt="${img.fields.title || card.fields.title}" 
  />
`).join('');


  return `
  <article class="service-card">
    <div class="service-card__images">
      ${imagesHTML}
    </div>

    <h4 class="service-card__title">${title}</h4>

    <p class="service-card__description">
      ${description}
    </p>
  </article>
`;

}).join('');

const servicesHTML = `
  <section class="services-section">
    <h3 class= "Titulo-de-seccion">
    Mis <span>servicios</span>
    </h3>
    <div class="services-cards">
      ${cardsHTML}
    </div>
  </section>
`;

document.getElementById('services-container').innerHTML = servicesHTML;
});



document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.formulario-campos'); // Seleccionamos el contenedor del formulario

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        console.log('Formulario enviado');
        const nombre = document.getElementById('nombre').value; // Capturamos el nombre
        const email = document.getElementById('email').value; // Capturamos el email
        const mensaje = document.getElementById('mensaje').value; // Capturamos el mensaje

        // Enviamos la solicitud POST
        fetch('https://apx.school/api/utils/email-to-student', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ to: "Ivanvelzi9@gmail.com", message: `${nombre}: ${mensaje} (Email: ${email})` })

        })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            alert('Mensaje enviado con éxito!'); // Mensaje de éxito
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje.'); // Mensaje de error
        });
    });
});



const loadComponent = async (id, htmlPath, jsPath) => {
  const container = document.getElementById(id);

  const res = await fetch(htmlPath);
  container.innerHTML = await res.text();

  if (jsPath) {
    const script = document.createElement("script");
    script.src = jsPath;
    script.defer = true;
    document.body.appendChild(script);
  }
};

loadComponent(
  "header",
  "/components/header.html",
  "/components/header.js"
);

loadComponent(
  "footer",
  "/components/footer.html"
);
