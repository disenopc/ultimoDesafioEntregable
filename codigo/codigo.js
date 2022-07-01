//VARIABLES-CONSTANTES GLOBALES
let productoA = [];
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productoL



//RENDERIZAR PRODUCTOS
function productosRenderizados() {
    const card = document.getElementById("cardDinamica");
    for (let array of productoA) {
        const productoL = document.createElement("div");
        productoL.innerHTML += `
        <div class="card mb-3 item" style="width: 18rem;">
          <div class="container card-body">
            <img class="imgArray  card-img-top" src="${array.img}">
            <h3 class="item-title"> ${array.nombre} </h3>
            <p class="card-text"><strong>$${array.precio}</strong></p>
            <button id="btn${array.id}" class=" add-cart"><i class='bx bx-shopping-bag' ></i></button>
            </div>
         </div>`
        card.appendChild(productoL);
    };
    //EVENTO DE BOTON
    productoA.forEach(array => {
        document.getElementById(`btn${array.id}`).addEventListener('click', function() {
            agregarAlCarrito(array);
        });
    });

}
//TOMAR PRODUCTOS DEL JSON
async function obtenerJSON() {
    const URLJSON = "/productos.json";
    const resp = await fetch("productos.json");
    const data = await resp.json();
    productoA = data;
    productosRenderizados();
}
obtenerJSON();

//INTERACCION CON EL DOM
let textoBotonUno = document.getElementById("botonUno");
console.log(textoBotonUno.innerHTML);
textoBotonUno.innerHTML = "Inicio";

let textoBotonDos = document.getElementById("botonDos");
console.log(textoBotonDos.innerHTML);
textoBotonDos.innerHTML = "Tienda";

let titulo = document.getElementById("titulo");
titulo.style.font = "bold  50px Source Serif";

let fondoFooter = document.getElementById("newsletter");
fondoFooter.style.background = "black";
fondoFooter.style.color = "white";
console.log(fondoFooter.innerHTML);

//EVENTOS SOBRE EL FORM DE NEWSLETTER
let form = document.getElementById("formulario");
form.addEventListener("click", (e) => botonEnviar(e));
const botonEnviar = (e) => {
    e.preventDefault();
    let email = e.target.parentNode.children[1].value;
    console.log(email);
    createNewSuscriptor({
        email
    });
    console.log(listasuscriptores);

};

class Suscriptor {
    constructor(email, id) {
        this.email = email;
        this.id = id;
    }
};

const createNewSuscriptor = (email) => {
    const id = listasuscriptores.generateId();
    const newSubs = new Suscriptor(email, id);
    listasuscriptores.addSuscriptor(newSubs);


};
class Suscriptores {
    constructor() {
        this.listasuscriptores = [];
    }
    addSuscriptor(suscriptort) {
        this.listasuscriptores.push(suscriptort);
    }
    generateId() {
        return Date.now();
    }
};

const listasuscriptores = new Suscriptores();

//PRESION DEL ENTER ANTES DE ESCRIBIR EMAIL
function capturarP(e) {
    ((e.which == 13) || (e.keycode == 13)) ? Swal.fire({
        text: 'Ingrese un email válido y luego presione enviar',
        confirmButtonColor: '#E8D637'
    }): ""
};


//SIMULADOR DE CARRITO 
let carritoDeCompras = [];

function agregarAlCarrito(productoNuevo) {
    const findCarrito = carritoDeCompras.find(e => e.id === productoNuevo.id)
    if (!findCarrito) {
        carritoDeCompras.push({ id: productoNuevo.id, nombre: productoNuevo.nombre, precio: productoNuevo.precio, cantidad: 1 });
    } else {
        const index = carritoDeCompras.indexOf(findCarrito)
        carritoDeCompras[index].cantidad++
    }
    console.log(...carritoDeCompras);
    Swal.fire({
        title: productoNuevo.nombre,
        text: "se agregó al carrito.",
        imageUrl: productoNuevo.img,
        imageWidth: 170,
        imageHeight: 159,
        imageAlt: 'articulo',
        confirmButtonColor: '#E8D637',
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    tablaDelCarrito()

};
//AGREGAR LOS PRODUCTOS AL DOM
function tablaDelCarrito(productoNuevo) {
    const tabla = document.getElementById("cuerpoTabla");
    tabla.innerHTML = ""
    carritoDeCompras.forEach((productoNuevo) => {
            cuerpoTabla.innerHTML += `
            <div class="cartBox">
                <p>${productoNuevo.id}</p>
                <div class="detail-box">
                    <div class="cart-prod-title"> ${ productoNuevo.nombre } </div>
                    <div><button  class="botonMenos" id="btnResta${productoNuevo.id}">-</button> ${productoNuevo.cantidad} <button class="botonMas" id="btnSuma${productoNuevo.id}">+</button></div>
                    <div class="cart-price">$ ${ productoNuevo.precio } </div>
                                              
                </div>
            <i class='bx bx-trash cart-remove' id ="btnEliminar${productoNuevo.id}"></i>
            </div> 
            `;

        }),
        carritoDeCompras.forEach(productoNuevo => {
            document.getElementById(`btnEliminar${ productoNuevo.id }`).addEventListener("click", function() {
                eliminar(productoNuevo);
                sumarTotal()
            });
        });
    //SUMAR CANTIDAD
    carritoDeCompras.forEach(productoNuevo => {
        document.getElementById(`btnResta${productoNuevo.id}`).addEventListener("click", function() {
            restar(productoNuevo)
        });
    });
    //RESTAR CANTIDAD
    carritoDeCompras.forEach(productoNuevo => {
        document.getElementById(`btnSuma${productoNuevo.id}`).addEventListener("click", function() {
            sumar(productoNuevo)
        });
    });


    //BORRAR EL TOTAL DEL CARRITO
    const borrarCarrito = document.createElement("div");
    cuerpoTabla.appendChild(borrarCarrito);
    borrarCarrito.innerHTML = `<button id ="btnBorrarCarrito" class = "btn btn-warning rounded-pill text-secondary"> Borrar carrito </button>`
    const btnBorrarCarrito = document.getElementById("btnBorrarCarrito")

    btnBorrarCarrito.addEventListener("click", () => {
        Swal.fire({
            title: 'Estás seguro que deseas eliminar el carrito?',
            text: "No podrás recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E8D637',
            cancelButtonColor: 'black',
            confirmButtonText: 'Si, eliminar carrito!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: 'El carrito ha sido eliminado!',
                    confirmButtonColor: '#E8D637'
                });
                borrar();
            }
        })


    });

    const totalF = document.getElementById("totalPrice");
    totalF.innerHTML = ""
    const sumaCarrito = document.createElement("div");
    const sumarProductos = carritoDeCompras.map(productoNuevo => productoNuevo.precio * productoNuevo.cantidad).reduce((prev, curr) => prev + curr, 0);
    sumaCarrito.innerHTML = "$" + sumarProductos;
    totalF.appendChild(sumaCarrito);


    //RESTA CANTIDADES
    const restar = (productoNuevo) => {
            const findCarrito = carritoDeCompras.find(e => e.id === productoNuevo.id);
            const index = carritoDeCompras.indexOf(findCarrito);
            carritoDeCompras[index].cantidad--;
            tablaDelCarrito()
        }
        // SUMA CANTIDADES
    const sumar = (productoNuevo) => {
        const findCarrito = carritoDeCompras.find(e => e.id === productoNuevo.id);
        const index = carritoDeCompras.indexOf(findCarrito);
        carritoDeCompras[index].cantidad++;
        tablaDelCarrito()
    }

}
const borrar = () => {
    carritoDeCompras = [];
    tablaDelCarrito();

}
const eliminar = (productoNuevo) => {
    const findCarrito = carritoDeCompras.find(e => e.id === productoNuevo.id);
    const index = carritoDeCompras.indexOf(findCarrito);
    carritoDeCompras.splice(index, 1);
    tablaDelCarrito();
}
tablaDelCarrito();

//BOTONES DE ABRIR Y CERRAR EL CARRO
let closeCart = document.querySelector("#cerrarCarro");
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
    cart.classList.remove("oculto");

};

closeCart.onclick = () => {
    cart.classList.remove("active");
    cart.classList.add("oculto");
};

//ABRIR Y CERRAR MODAL
let envioADomicilio = document.querySelector(".envioAdomicilio");
let modal = document.querySelector(".modalEnvio");
let cerrarElModal = document.querySelector(".cerrarModal");



if (envioADomicilio.checked) {
    envioADomicilio.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("mostralModal");
    });
}
cerrarElModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("mostralModal");
});



//EVENTO BOTON FINALIZAR COMPRA
let finDeLaCompra = document.querySelector(".finCompra");
finDeLaCompra.addEventListener("click", (e) => {
    Swal.fire(
        "Gracias por tu compra, hasta pronto"
    );
});




//*******************************************************************CAMBIO DE COLOR BODY

//Modo cuervo
// let modo = localStorage.getItem("modo");
// if (modo == null) {
//     modo = "dark"
// };
// let menu = document.getElementById("menu");
// let boton = document.getElementById("mode");
// document.body.className = modo;
// menu.className = "navbar navbar-expand-lg " + modo;
// localStorage.setItem("modo", modo);

// function blue() {
//     document.body.className = "blue"
//     menu.className = "navbar navbar-expand-lg blue";
//     modo = "blue";
//     boton.innerText = "Modo Cuervo";
// }

// function dark() {
//     document.body.className = "dark";
//     menu.className = "navbar navbar-expand-lg dark";
//     modo = "dark";
//     boton.innerText = "Modo Oscuro";
// }
//IF TERNARIO
// boton.onclick = () => {
//     {
//         (modo == "dark") ? blue(): dark();
//         console.log("El boton funciona");
//     }

//     localStorage.setItem("modo", modo);
// }