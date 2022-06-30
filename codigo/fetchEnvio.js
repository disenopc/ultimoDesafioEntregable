// function obtenerJSON() {
//     const URLGET = "https://apisqa.andreani.com/v2/sucursales";
//     fetch(URLGET)
//         .then(resultado => resultado.json())
//         .then(data => {
//             let sucursales = data;
//             sucursales.forEach(enviosS => {
//                 document.querySelector("#sucursales").innerHTML += `
//                 <tr>
//                 <option>${enviosS.direccion.calle},${enviosS.direccion.numero},${enviosS.direccion.localidad}</option>
//                 </tr>
//                 `;
//             })
//         })

// }
// obtenerJSON();

// let textoBotonUnoF = document.getElementById("botonUnoF");
// console.log(textoBotonUnoF.innerHTML);
// textoBotonUnoF.innerHTML = "Inicio";

// let textoBotonDosF = document.getElementById("botonDosF");
// console.log(textoBotonDosF.innerHTML);
// textoBotonDosF.innerHTML = "Tienda";



// function cP() {
//     let codigoPostal = enviosS.direccion.codigoPostal;

//     if (codigoPostal != "") {
//         document.querySelector("#modal-body").innerHTML += `
//         <h5>Popover in a modal</h5>
//         <p>This <a href="#" role="button" class="btn btn-secondary" data-bs-toggle="popover" title="Popover title" data-bs-content="Popover body content is set in this attribute.">button</a> triggers a popover on click.</p>
//         <hr>`
//     }
//     "Error ingrese un codigo postal"
// }
// cP();