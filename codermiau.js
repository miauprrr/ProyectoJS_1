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
        })
    }
}

function leerCarrito(cremasArray, maquillajeArray) {
    if (window.location.pathname.includes('carrito.html')) {
        let dataCarrito = JSON.parse(localStorage.getItem("carrito"))
        let tbodyCarrito = document.getElementById("tbody-carrito")
        let newProduct = ""
        dataCarrito.forEach(producto => {
            let division = producto.id.split("_")
            let productoEncontrado = {}
            if (division[0] == "c") {
                productoEncontrado = cremasArray.find((crema) => crema.id == division[1])
            } else {
                productoEncontrado = maquillajeArray.find((maquillaje) => maquillaje.id == division[1])
            }
            console.log(producto.cantidad * productoEncontrado.precio)
            newProduct += ` <tr>
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
                                <td class="align-middle p-4"><input type="text" class="form-control text-center"
                                        value="${producto.cantidad}"></td>
                                <td class="text-right font-weight-semibold align-middle p-4">${producto.cantidad * productoEncontrado.precio}</td>
                                <td class="text-center align-middle px-0"><a href="#"
                                        class="shop-tooltip close float-none text-danger" title=""
                                        data-original-title="Remove">×</a></td>
                            </tr>`
            
        });
        tbodyCarrito.innerHTML = newProduct
        console.log(dataCarrito)
    }
}



mostrarProductos(cremasArray, maquillajeArray)
agregarCarrito()
leerCarrito(cremasArray, maquillajeArray)