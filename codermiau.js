let cremasArray = [
    {
        id: 1,
        tipo: "c",
        nombre: "Crema para cuerpo",
        precio: "14990",
        stock: 10,
        imagen: "/img/product-1.jpg",
        descripcion: ""
    },
    {
        id: 2,
        tipo: "c",
        nombre: "Crema contorno de ojos",
        precio: "15990",
        stock: 10,
        imagen: "/img/product-2.jpg",
        descripcion: ""
    },
    {
        id: 3,
        tipo: "c",
        nombre: "Crema de rostro",
        precio: "25000",
        stock: 10,
        imagen: "/img/product-3.jpg",
        descripcion: ""
    },
    {
        id: 4,
        tipo: "c",
        nombre: "Aceite facial",
        precio: "23980",
        stock: 10,
        imagen: "/img/product-4.jpg",
        descripcion: ""
    },
    {
        id: 5,
        tipo: "c",
        nombre: "Kit rostro piel sensible",
        precio: "37980",
        stock: 10,
        imagen: "/img/product-5.jpg",
        descripcion: ""
    },
    {
        id: 6,
        tipo: "c",
        nombre: "Toner todo tipo de piel",
        precio: "14990",
        stock: 10,
        imagen: "/img/product-6.jpg",
        descripcion: ""
    }
]

let maquillajeArray = [
    {
        id: 1,
        tipo: "m",
        nombre: "Paleta de sombras",
        precio: "26990",
        stock: 10,
        imagen: "../img/maquillaje-1.jpg",
        descripcion: ""
    },
    {
        id: 2,
        tipo: "m",
        nombre: "kit labiales, esmaltes y sombras",
        precio: "32980",
        stock: 10,
        imagen: "../img/maquillaje-2.jpg",
        descripcion: ""
    },
    {
        id: 3,
        tipo: "m",
        nombre: "Tinte de labios",
        precio: "12990",
        stock: 10,
        imagen: "../img/maquillaje-3.jpg",
        descripcion: ""
    },
    {
        id: 4,
        tipo: "m",
        nombre: "Set de labiales",
        precio: "17980",
        stock: 10,
        imagen: "../img/maquillaje-4.jpg",
        descripcion: ""
    },
    {
        id: 5,
        tipo: "m",
        nombre: "Iluminador",
        precio: "23990",
        stock: 10,
        imagen: "../img/maquillaje-5.jpg",
        descripcion: ""
    },
    {
        id: 6,
        tipo: "m",
        nombre: "Sombra con brillos para ojos",
        precio: "8990",
        stock: 10,
        imagen: "../img/maquillaje-6.jpg",
        descripcion: ""
    }
]

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
    });
    return newElement
}

function agregarCarrito() {
    let carrito = []
    let almacenado = JSON.parse(localStorage.getItem("carrito")) || [];
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
            }).showToast();
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
        let valorTotal = 0
        dataCarrito.forEach(producto => {

            let [valorParcial, productoEncontrado] = calculoValorParcial(cremasArray, maquillajeArray, producto)

            valorTotal = valorTotal + valorParcial
            newProduct += ` <tr id="${producto.id}">
                                <td class="p-4">
                                    <div class="media align-items-center">
                                        <img src=${productoEncontrado.imagen}
                                            class="d-block ui-w-40 ui-bordered mr-4" alt="">
                                        <div class="media-body">
                                            <a href="#" class="d-block text-dark">${productoEncontrado.nombre}</a>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-right font-weight-semibold align-middle p-4">$${productoEncontrado.precio}</td>
                                <td class="align-middle p-4"><input type="number" min="1" class="cantidad-producto-carrito form-control text-center"
                                        value="${producto.cantidad}"></td>
                                <td class="text-right font-weight-semibold align-middle p-4">${producto.cantidad * productoEncontrado.precio}</td>
                                <td class="text-center align-middle"><button type="button" class="boton-borrar btn btn-danger">X</button></td>
                            </tr>`
            
        })
        tbodyCarrito.innerHTML = newProduct

        let contenedor = document.createElement("strong")
        contenedor.innerText = `$${valorTotal}`
        let totalCarrito = document.getElementById("total-carrito")
        totalCarrito.appendChild(contenedor)
    }
}

function modificarCantidad(cremasArray, maquillajeArray) {
    if (window.location.pathname.includes('carrito.html')) {
        let inputsCantidad = document.getElementsByClassName("cantidad-producto-carrito")
        for (const thisInput of inputsCantidad) {
            thisInput.addEventListener("change", (e) => {

                let dataCarrito = JSON.parse(localStorage.getItem("carrito"));
                let valorTotal = 0

                for (const producto of dataCarrito) {
                    if (producto.id === e.target.parentNode.parentNode.id) {
                        producto.cantidad = Number(e.target.value)
                        let [valorParcial] = calculoValorParcial(cremasArray, maquillajeArray, producto)
                        let nodoValorParcial = e.target.parentNode.nextElementSibling
                        nodoValorParcial.innerText = `$${valorParcial}`
                    }
                    let [valorParcial] = calculoValorParcial(cremasArray, maquillajeArray, producto)
                    valorTotal += valorParcial
                }

                let totalCarrito = document.getElementById("total-carrito").firstChild
                totalCarrito.innerText = `$${valorTotal}`

                localStorage.setItem("carrito", JSON.stringify(dataCarrito))
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
                let dataCarrito = JSON.parse(localStorage.getItem("carrito"));
                let indiceProductoCarrrito = dataCarrito.findIndex(elemento => elemento.id === idProducto);
                dataCarrito.splice(indiceProductoCarrrito, 1)
                localStorage.setItem("carrito", JSON.stringify(dataCarrito))
                location.reload()
            })
        }
    }
}

mostrarProductos(cremasArray, maquillajeArray)
agregarCarrito()
leerCarrito(cremasArray, maquillajeArray)
modificarCantidad(cremasArray, maquillajeArray)
borrarProducto(cremasArray, maquillajeArray)