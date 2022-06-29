let productoA = [];
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productoL




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
    productoA.forEach(array => {
        document.getElementById(`btn${array.id}`).addEventListener('click', function() {
            agregarAlCarrito(array);
        });
    });
    //Abrir carrito

}
async function obtenerJSON() {
    const URLJSON = "/productos.json";
    const resp = await fetch("productos.json");
    const data = await resp.json();
    productoA = data;
    productosRenderizados();
}
obtenerJSON();
//Interactuando con el html
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



//Eventos sobre el Formulario Newsletter

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




//Tecla enter
function capturarP(e) {
    ((e.which == 13) || (e.keycode == 13)) ? Swal.fire({
        text: 'Ingrese un email válido y luego presione enviar',
        confirmButtonColor: '#E8D637'
    }): ""
};


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

function blue() {
    document.body.className = "blue"
    menu.className = "navbar navbar-expand-lg blue";
    modo = "blue";
    boton.innerText = "Modo Cuervo";
}

function dark() {
    document.body.className = "dark";
    menu.className = "navbar navbar-expand-lg dark";
    modo = "dark";
    boton.innerText = "Modo Oscuro";
}
//IF TERNARIO
// boton.onclick = () => {
//     {
//         (modo == "dark") ? blue(): dark();
//         console.log("El boton funciona");
//     }

//     localStorage.setItem("modo", modo);
// }

//Modificador de carro  
let carritoDeCompras = [];

//Tabla simula carrito

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

}

function tablaDelCarrito(productoNuevo) {
    const tabla = document.getElementById("cuerpoTabla");
    tabla.innerHTML = ""

    carritoDeCompras.forEach((productoNuevo) => {
            cuerpoTabla.innerHTML += `<div class="cartBox">
            <div>${productoNuevo.id}</div>
            <div class="detail-box">
                    <div class="cart-prod-title"> ${ productoNuevo.nombre } </div>
                    <div class="cart-price">$ ${ productoNuevo.precio } </div>
                    <input type="number" value="1" class="cart-quantity">                                
            </div>
            <i class='bx bx-trash cart-remove' id ="btnEliminar${productoNuevo.id}"></i>
            </div> 
             </tr> `;

        }),

        carritoDeCompras.forEach(productoNuevo => {
            document.getElementById(`btnEliminar${ productoNuevo.id }`).addEventListener('click', function() {
                eliminar(productoNuevo);
            });
        });

    const sumaCarrito = document.createElement("div");
    const sumarProductos = carritoDeCompras.map(productoNuevo => productoNuevo.precio * productoNuevo.cantidad).reduce((prev, curr) => prev + curr, 0);
    cuerpoTabla.appendChild(sumaCarrito);
    sumaCarrito.innerHTML = "$" + sumarProductos;

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


    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}

//CARRITO
let closeCart = document.querySelector("#cerrarCarro");
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};
//Cerrar carrito
closeCart.onclick = () => {
    cart.classList.remove("active");
};
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