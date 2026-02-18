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

loadComponent("header", "/PortfolioIvanVelzi-WebAndComponents/components/header.html", "/PortfolioIvanVelzi-WebAndComponents/components/header.js");

loadComponent("footer", "/PortfolioIvanVelzi-WebAndComponents/components/footer.html");

