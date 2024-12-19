const getData = async () => {
    const respuesta = await fetch('../data.json')
    const data = await respuesta.json()
    return data
}

function mostrarProductos(cremasArray, maquillajeArray) {
    let divCremas = document.getElementsByClassName("lista-cremas")
    let divMaquillaje = document.getElementsByClassName("lista-maquillaje")
    let listElements = ""
    if (divCremas.length > 0) {
        listElements = createProducts(cremasArray)
        divCremas[0].innerHTML = listElements
    } else if (divMaquillaje.length > 0) {
        listElements = createProducts(maquillajeArray)
        divMaquillaje[0].innerHTML = listElements
    }
}

function createProducts(arregloProductos) {
    let newElement = ""
    arregloProductos.forEach(producto => {
        newElement = newElement + `<div class='productos'>
                                        <div class='product-index-container'>
                                            <a><img class='product-index' src=${producto.imagen} alt=${producto.descripcion}></a>
                                        </div>
                                        <p class='crema'>${producto.nombre}</p>
                                        <p class='precio'>$${producto.precio}</p>
                                        <button class='boton-compra' id='${producto.tipo}_${producto.id}'>Agregar al carro</button>
                                    </div>`
    })
    return newElement
}

function agregarCarrito() {
    let carrito = []
    let almacenado = JSON.parse(localStorage.getItem("carrito")) || []
    carrito = almacenado
    let botonesCarrito = document.getElementsByClassName("boton-compra")
    for (const thisButton of botonesCarrito) {
        thisButton.addEventListener("click", () => {
            let isThisExist = carrito.find((elemento) => elemento.id == thisButton.id)
            if (isThisExist) {
                let indiceElemento = carrito.indexOf(isThisExist)
                carrito[indiceElemento].cantidad++
            } else {
                carrito.push({
                    id: thisButton.id,
                    cantidad: 1
                })
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
            Toastify({
                text: "Se ha agregado al carrito :)",
                gravity: "bottom",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #fdff9c, #fdc3db)",
                }
            }).showToast()
        })
    }
}
function calculoValorParcial(cremasArray, maquillajeArray, producto) {
    let division = producto.id.split("_")
    let productoEncontrado = {}
    division[0] == "c" ?  productoEncontrado = cremasArray.find((crema) => crema.id == division[1]) : productoEncontrado = maquillajeArray.find((maquillaje) => maquillaje.id == division[1])

    let valorParcial = producto.cantidad * Number(productoEncontrado.precio)

    return [valorParcial, productoEncontrado]
}

function leerCarrito(cremasArray, maquillajeArray) {
    if (window.location.pathname.includes('carrito.html')) {
        let dataCarrito = JSON.parse(localStorage.getItem("carrito"))
        let tbodyCarrito = document.getElementById("tbody-carrito")
        let newProduct = ""
        dataCarrito.forEach(producto => {

            let [,productoEncontrado] = calculoValorParcial(cremasArray, maquillajeArray, producto)

            newProduct += ` <tr id="${producto.id}">
                                <td class="p-4">
                                    <div class="media align-items-center d-flex">
                                        <img src=${productoEncontrado.imagen}
                                            class="d-block ui-w-70 ui-bordered mr-4" alt="">
                                        <div class="media-body">
                                            <a class="d-block text-dark">${productoEncontrado.nombre}</a>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-right font-weight-semibold align-middle p-4">$${productoEncontrado.precio}</td>
                                <td class="align-middle p-4"><input type="number" min="1" class="cantidad-producto-carrito form-control text-center"
                                        value="${producto.cantidad}"></td>
                                <td class="text-right font-weight-semibold align-middle p-4">$${producto.cantidad * productoEncontrado.precio}</td>
                                <td class="text-center align-middle"><button type="button" class="boton-borrar btn btn-danger">X</button></td>
                            </tr>`
            
        })
        tbodyCarrito.innerHTML = newProduct

        let contenedor = document.createElement("strong")
        let valorTotal = calculoValorTotal(cremasArray, maquillajeArray, dataCarrito)
        contenedor.innerText = `$${valorTotal}`
        let totalCarrito = document.getElementById("total-carrito")
        totalCarrito.appendChild(contenedor)
    }
}

function modificarCantidad(cremasArray, maquillajeArray) {
    if (window.location.pathname.includes('carrito.html')) {
        let inputsCantidad = document.getElementsByClassName("cantidad-producto-carrito")

        let valoresAnteriores = {}

        for (const thisInput of inputsCantidad) {
            let valorInicial = Number(thisInput.value)
            valoresAnteriores[thisInput.id] = valorInicial

            thisInput.addEventListener("focus", (e) => {
                valoresAnteriores[e.target.id] = Number(e.target.value)
            })

            thisInput.addEventListener("change", (e) => {
                let dataCarrito = JSON.parse(localStorage.getItem("carrito"))
                let cantidadProductoCarrito = Number(e.target.value)
                let valorAnterior = valoresAnteriores[e.target.id]

                if (cantidadProductoCarrito <= 0 && valorAnterior > 0) {
                    e.target.value = valorAnterior
                    cantidadProductoCarrito = valorAnterior
                }

                if (cantidadProductoCarrito > 0) {
                    for (const producto of dataCarrito) {
                        if (producto.id === e.target.parentNode.parentNode.id) {
                            producto.cantidad = cantidadProductoCarrito
                            let [valorParcial] = calculoValorParcial(cremasArray, maquillajeArray, producto)
                            let nodoValorParcial = e.target.parentNode.nextElementSibling
                            nodoValorParcial.innerText = `$${valorParcial}`
                        }
                    }

                    let totalCarrito = document.getElementById("total-carrito").firstChild
                    let valorTotal = calculoValorTotal(cremasArray, maquillajeArray, dataCarrito)
                    totalCarrito.innerText = `$${valorTotal}`

                    valoresAnteriores[e.target.id] = cantidadProductoCarrito

                    localStorage.setItem("carrito", JSON.stringify(dataCarrito))
                }
            })
        }
    }
}

function borrarProducto(cremasArray, maquillajeArray) {
    if (window.location.pathname.includes('carrito.html')) {
        let botonesBorrar = document.getElementsByClassName("boton-borrar")
        for (const botonDelete of botonesBorrar) {
            botonDelete.addEventListener("click", (e) => {
                let idProducto = e.target.parentNode.parentNode.id
                let dataCarrito = JSON.parse(localStorage.getItem("carrito"))
                let indiceProductoCarrrito = dataCarrito.findIndex(elemento => elemento.id === idProducto)
                dataCarrito.splice(indiceProductoCarrrito, 1)
                localStorage.setItem("carrito", JSON.stringify(dataCarrito))
                let dataCarritoNew = JSON.parse(localStorage.getItem("carrito"))
                let valorTotal = calculoValorTotal(cremasArray, maquillajeArray, dataCarritoNew)
                let totalCarrito = document.getElementById("total-carrito").firstChild
                let productoAEliminar = e.target.parentNode.parentNode
                productoAEliminar.remove()
                totalCarrito.innerText = `$${valorTotal}`

            })
        }
    }
}

function calculoValorTotal(cremasArray, maquillajeArray, productos) {
    let valorTotal = 0
    for (const producto of productos) {
        let division = producto.id.split("_")
        let productoEncontrado = {}
        division[0] == "c" ?  productoEncontrado = cremasArray.find((crema) => crema.id == division[1]) : productoEncontrado = maquillajeArray.find((maquillaje) => maquillaje.id == division[1])

        let valorParcial = producto.cantidad * Number(productoEncontrado.precio)
        valorTotal = valorTotal + valorParcial
    }
    return valorTotal
}

let data = await getData()
const cremasArray = data.productos.cremasArray
const maquillajeArray = data.productos.maquillajeArray
mostrarProductos(cremasArray, maquillajeArray)
agregarCarrito()
leerCarrito(cremasArray, maquillajeArray)
modificarCantidad(cremasArray, maquillajeArray)
borrarProducto(cremasArray, maquillajeArray)