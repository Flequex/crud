let agregar = document.getElementById("agregar");
let formulario = document.getElementById("formulario");
let tarea = document.getElementById("tarea");
let tabla = document.getElementById("tabla");



formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    // console.log("ninja")
    if (formularioValido()) {
        agregarTarea()
    }
})



function formularioValido() {
    let mensaje = document.getElementById("mensaje");
    let texto = ""
    if (tarea.value.trim() === "") {
        texto = "Error";
    }
    mensaje.innerHTML = texto
    return (texto == "Error") ? false : true
}



function agregarTarea() {
    console.log("enviando");
    let listaTarea = document.getElementById("listaTarea")
    listaTarea.innerHTML += `
        <tr>
            <td>${tarea.value}</td>
              <td class="text-center">
                <button onclick="deletePost(this)" type="button" class="btn btn-primary my-1">Borrar</button>
                <button onclick="editar(this)" type="button" class="btn btn-warning my-1">Editar</button>
            </td>
        </tr>
        `
    tarea.value = "";
    guardar(tablaAJSON('listaTarea'));
}


function deletePost(e) {

    e.parentElement.parentElement.remove();
}


let editar = (e) => {
    tarea.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
}


let tablaAJSON = (table) => {
    let data = {};
    table = document.getElementById(table)
    let row, rows = table.rows;
    for (let i = 0, largo = rows.length; i < largo; i++) {
        row = rows[i];
        let contenido = row.cells[0].textContent
        // console.log(row.cells[1].textContent);
        // data[row.cells[0].textContent]=row.cells[1].textContent
        data[i] = contenido
    }
    return JSON.stringify(data);
}

let guardar = (texto) => {

    localStorage.setItem('tabla', texto);
}

let leer = (ls) => {
    const tabla1 = JSON.parse(localStorage.getItem(ls));
    for (let [key, value] of Object.entries(tabla1)) {
        console.log(value);
        let listaTarea = document.getElementById("listaTarea")
        listaTarea.innerHTML += `
        <tr>
            <td>${value}</td>
              <td class="text-center">
                <button onclick="deletePost(this)" type="button" class="btn btn-primary my-1">Borrar</button>
                <button onclick="editar(this)" type="button" class="btn btn-warning my-1">Editar</button>
            </td>
        </tr>
        `
    }
}

document.addEventListener('DOMContentLoaded', () => {
    leer("tabla")
});
