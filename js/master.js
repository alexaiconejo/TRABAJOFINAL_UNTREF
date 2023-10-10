// Capturar los elementos
let planetasHTML = document.querySelector('.planetas');

fetch('../datos/planetas.json')
    .then((respuesta) => {
        return respuesta.json();
    })
    .then((planetas) => {
        planetas.forEach(planeta => {
            planetasHTML.innerHTML += `
            <article class="planeta">
                <img class='imgPlaneta' src="${planeta.imagen}" alt="${planeta.nombre}">
                <h2 class='nombre'>${planeta.nombre}</h2>
                <h3>Simbolo: ${planeta.simbolo}</h3>
                <h3>Precio: ${planeta.precio}</h3>
                <a id='${planeta.codigo}' href='#' class='botonDetalle'>Ver</a>
            </article>`;
        });

        let botonDetalle = document.querySelectorAll('.botonDetalle');

        botonDetalle.forEach(planetaSeleccion => {
            planetaSeleccion.addEventListener('click', function (e) {
                e.preventDefault();
                let miListaDePlanetas = localStorage.getItem('detallesPlaneta');
                let arrayMiListaDePlanetas;

                if (miListaDePlanetas == null) {
                    arrayMiListaDePlanetas = [];
                } else {
                    arrayMiListaDePlanetas = JSON.parse(miListaDePlanetas);
                }

                let planetaSeleccionado = planetas.find(planeta => planeta.codigo === this.id);
                arrayMiListaDePlanetas.push(planetaSeleccionado);
                localStorage.setItem('detallesPlaneta', JSON.stringify(arrayMiListaDePlanetas));
                location.href = `detalle.html?codigo=${planetaSeleccionado.codigo}`;
            });
        });
    })
    .catch((error) => {
        console.log('Ufff ha ocurrido un error ' + error);
    });
