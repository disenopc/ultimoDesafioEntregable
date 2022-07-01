function obtenerJSON() {
    const URLGET = "https://apisqa.andreani.com/v2/sucursales";
    fetch(URLGET)
        .then(resultado => resultado.json())
        .then(data => {
            let sucursales = data;
            sucursales.forEach(enviosS => {
                document.querySelector("#sucursales").innerHTML += `
                <tr>
                <option>${enviosS.direccion.calle},${enviosS.direccion.numero},${enviosS.direccion.localidad}</option>
                </tr>
                `;
            })
        })

}
obtenerJSON();