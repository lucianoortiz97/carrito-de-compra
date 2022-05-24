// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody') //26
const limpiarCarrito = document.querySelector('#vaciar-carrito') // 38
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];  // se va a ir agregando/eliminando elementos

cargarEventListeners()
function cargarEventListeners(){
    //Se agrega al presionar "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito 
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    limpiarCarrito.addEventListener('click', () => {
        articulosCarrito = []; // resetea el arreglo

        limpiarHTML(); // Limpia todo el HTML
    })
}


// Funciones 
function agregarCurso(e){
    e.preventDefault() // Si tiene el href # te devuelve arriba. Con esto se mantiene
    if(e.target.classList.contains ('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement // Verificamos que lo que se presiona es el correcto
        leerDatosCursos(cursoSeleccionado)
    } 
    
}

//Elimina un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina el arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter ( curso => curso.id !== cursoId );

        carritoHTML(); // Itera sobre el carrito y muestra HTML 
    }
}


// Lee el contenido del HTML al que damos click y extrae info
function leerDatosCursos(cursos){
    
    // Crear objeto con el contenido actual
    const infoCurso = {
        imagen: cursos.querySelector('img').src,
        titulo: cursos.querySelector('h4').textContent,
        precio: cursos.querySelector('.precio span').textContent,
        id: cursos.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito. - .some itera sobre un array de object y verifica si un elemnt existe
    const existe = articulosCarrito.some( cursos => cursos.id === infoCurso.id );
    if(existe){
        // Actualizamos la cantidad
        const curso = articulosCarrito.map( cursos => {
            if( cursos.id === infoCurso.id){
                cursos.cantidad++;
                return cursos; // retorna el objeto actualizado
            } else {
                return cursos; // retorno los no duplicados
            }
    })
    articulosCarrito = [...curso];
    } else {
    
        // Agregamos el curso al carrito        
   articulosCarrito = [...articulosCarrito, infoCurso];
    }


   console.log(articulosCarrito)

   carritoHTML();
}


// Muestra carrito de compras en HTML
function carritoHTML () {

    // Limpiar HTML (por las dudas que haya duplicados)
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( cursos => {
        const { imagen, titulo, precio, cantidad, id  } = cursos;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${cursos.imagen}" width="150" >
        </td>
        <td>   ${cursos.titulo}   </td>
        <td>   ${cursos.precio}   </td>
        <td>   ${cursos.cantidad} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${cursos.id}" > X </a>    
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody
function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma eficiente
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}