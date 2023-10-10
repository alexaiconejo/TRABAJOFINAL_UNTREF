// Guardo lo que trae el query strings
let codigo = location.search;
let codigoPlaneta = new URLSearchParams(codigo);
let codigoSeleccionado = codigoPlaneta.get('codigo');

// Capturo los datos de la página de detalle
let codigoFinal = document.getElementById('codigo');
let nombre = document.getElementById('nombre');
let precio = document.getElementById('precio');
let simbolo = document.getElementById('simbolo');
let regente = document.getElementById('regente');
let datos = document.getElementById('datos');


let imagen = document.getElementById('imagen');

// Fetch original para obtener los datos de los planetas
fetch('./datos/planetas.json')
    .then((respuesta) => {
        return respuesta.json();
    })
    .then((planetas) => {
        // Buscar el planeta correspondiente al código en el URL
        let planetaSeleccionado = planetas.find(planeta => planeta.codigo === codigoSeleccionado);

        if (planetaSeleccionado) {
            // Muestro de manera dinámica los detalles del planeta
            codigoFinal.innerHTML = `${codigoSeleccionado}`;
            nombre.innerHTML = `${planetaSeleccionado.nombre}`;
            precio.innerHTML = `$ ${planetaSeleccionado.precio}`;

            if (simbolo) {
                simbolo.innerHTML = `Símbolo: ${planetaSeleccionado.simbolo}`;
            }

            if (regente) {
                regente.innerHTML = `Regente de: ${planetaSeleccionado.regente}`;
            }

            if (datos) {
                datos.innerHTML = `${planetaSeleccionado.datos}`;
            }

            if (imagen) {
                imagen.src = planetaSeleccionado.imagen;
                imagen.alt = planetaSeleccionado.nombre;
            }
        }
    })
    .catch((error) => {
        console.log('Ufff ha ocurrido un error ' + error);
    });

// Capturo el botón que me permite regresar y además borrar todo lo que tengo en mi localStorage
let botonRegresar = document.getElementById('botonRegresar');
botonRegresar.addEventListener('click', function () {
    localStorage.clear();
    location.href = 'index.html';
});
