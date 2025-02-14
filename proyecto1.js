class Alumno {
    constructor(nombre, notaLeng, notaMate, notaCs, notaIng, notaHist) {
        this.nombre = nombre
        this.notaLeng = notaLeng
        this.notaMate = notaMate
        this.notaCs = notaCs
        this.notaIng = notaIng
        this.notaHist = notaHist
        this.promedioFinalAlumno = this.promedioFinal(notaLeng, notaMate, notaCs, notaIng, notaHist)
    }
    promedioFinal(notaLeng, notaMate, notaCs, notaIng, notaHist){
        return (notaLeng + notaMate + notaCs + notaIng + notaHist)/5
    }
}

function dataAlumnos(arregloAlumnos) {
    const nombreAlumno = prompt("Ingrese nombre del alumno")
    const notaLeng = parseFloat(prompt("Ingrese nota final de Lenguaje"))
    const notaMate = parseFloat(prompt("Ingrese nota final de Matemática"))
    const notaCs = parseFloat(prompt("Ingrese nota final de Ciencias"))
    const notaIng = parseFloat(prompt("Ingrese nota final de Inglés"))
    const notaHist = parseFloat(prompt("Ingrese nota final de Historia"))

    let nuevoALumno = new Alumno(nombreAlumno, notaLeng, notaMate, notaCs, notaIng, notaHist)
    
    arregloAlumnos.push(nuevoALumno)

    const opcion = Number(prompt("Quiere hacer un nuevo ingreso?\n 1.- Si\n 2.- No"))

    if (opcion==1) {
        dataAlumnos(arregloAlumnos)
    }
    
    inicial(arregloAlumnos)
}

function getPromedioFinal(arregloAlumnos) {
    if (arregloAlumnos.length != 0) {
        const nombreAlumno = prompt("Ingrese nombre del alumno")
        const resultado = arregloAlumnos.find((alumno) => alumno.nombre === nombreAlumno)
        if(resultado && nombreAlumno){
            alert(`El promedio de ${resultado.nombre} es ${resultado.promedioFinalAlumno}`)
        }else if(!resultado && nombreAlumno){
            alert("Error. Alumno ingresado no existe")
            getPromedioFinal(arregloAlumnos)
        }
    }else{
        alert("Error. No hay notas ingresadas de los alumnos")
    }
    inicial(arregloAlumnos)
}

function promedioPorRamo(arregloAlumnos) {
    const idRamo = Number(prompt("MENÚ\n\n Seleccione una opción:\n 1.- Lenguaje\n 2.- Matemática\n 3.- Ciencias\n 4.- Inglés\n 5.- Historia\n 6.- Salir"))

    switch (idRamo) {
        case 1:
            calcularNotaRamo(arregloAlumnos, "notaLeng")
            break;
        case 2:
            calcularNotaRamo(arregloAlumnos, "notaMate")
            break;
        case 3:
            calcularNotaRamo(arregloAlumnos, "notaCs")
            break;
        case 4:
            calcularNotaRamo(arregloAlumnos, "notaIng")
            break;
        case 5:
            calcularNotaRamo(arregloAlumnos, "notaHist")
            break;
        case 6:
            inicial(arregloAlumnos)
            break;
        default:
            alert("Seleccione una de las opciones indicadas en el menú")
            promedioPorRamo(arregloAlumnos)
            break;
    }
}

function calcularNotaRamo(arregloAlumnos, nombreRamo) {
    const diccionarioRamos = {
        "notaLeng": "Lenguaje",
        "notaMate": "Matemática",
        "notaCs": "Ciencias",
        "notaIng": "Inglés",
        "notaHist": "Historia"
    }
    let sumaNotas = arregloAlumnos.reduce((acumulador, alumno) => acumulador + alumno[nombreRamo], 0)
    const notaFinal = sumaNotas/arregloAlumnos.length
    if (!Number.isNaN(notaFinal)) {
        alert(`EL promedio final de ${diccionarioRamos[nombreRamo]} es ${notaFinal}`)
    }else {
        alert("No hay datos ingresados")
    }

    inicial(arregloAlumnos)
}

function alumnosApproved(arregloAlumnos) {
    const aprobados = arregloAlumnos.filter((alumno) => isApproved(alumno.promedioFinalAlumno))
    let mensajeAprobados = ""

    if (aprobados.length != 0) {
        aprobados.forEach(alumnoAprobado => {
            mensajeAprobados = mensajeAprobados + `${alumnoAprobado.nombre} : ${alumnoAprobado.promedioFinalAlumno}\n`
        });
        if (aprobados.length==1) {
            alert(`El alumno aprobado es:\n${mensajeAprobados}`)
        } else {
            alert(`La lista de los alumnos aprobados es:\n${mensajeAprobados}`)
        }
    }else{
        alert("No existen alumnos aprobados")
    }
    inicial(arregloAlumnos)
}

function isApproved(promedioFinal) {
    if (promedioFinal<4) {
        return false
    } else {
        return true
    }
}

function inicial(arregloAlumnos) {
    const opcionMenu = Number(prompt("MENÚ\n\n Seleccione una opción:\n 1.- Nuevo ingreso\n 2.- Promedio final del alumno\n 3.- Promedio final del curso por asignatura\n 4.- Lista alumnos aprobados \n 5.- Salir")) 

    switch (opcionMenu) {
        case 1:
            dataAlumnos(arregloAlumnos)
            break;
        case 2:
            getPromedioFinal(arregloAlumnos)
            break;
        case 3:
            promedioPorRamo(arregloAlumnos)
            break;
        case 4:
            alumnosApproved(arregloAlumnos)
            break;
        case 5:
            alert("Saliendo del menú")
            break;
        default:
            alert("Seleccione una de las opciones indicadas en el menú")
            inicial(arregloAlumnos)
            break;
    }
}

let arregloAlumnos = []

inicial(arregloAlumnos)
