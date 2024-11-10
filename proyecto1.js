// alert("Ingrese el nombre y las 6 notas finales de las asignaturas de su alumno")

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

    let opcion = Number(prompt("Quiere hacer un nuevo ingreso?\n 1.- Si\n 2.- No"))

    if (opcion==1) {
        dataAlumnos(arregloAlumnos)
    }
    
    inicial(arregloAlumnos)
}

function getPromedioFinal(arregloAlumnos) {
    if (arregloAlumnos.length != 0) {
        const nombreAlumno = prompt("Ingrese nombre del alumno")
        const resultado = arregloAlumnos.find((alumno) => alumno.nombre === nombreAlumno)
        alert(`El promedio de ${resultado.nombre} es ${resultado.promedioFinalAlumno}`)
    }else{
        alert("Error. No hay notas ingresadas de los alumnos")
    }
    inicial(arregloAlumnos)
}

function inicial(arregloAlumnos) {
    let opcionMenu = Number(prompt("MENÚ\n\n Seleccione una opción:\n 1.- Nuevo ingreso\n 2.- Promedio final del alumno\n 3.- Promedio final del curso por asignatura\n 4.- Lista alumnos aprobados \n 5.- Salir")) 

    
    switch (opcionMenu) {
        case 1:
            dataAlumnos(arregloAlumnos)
            break;
        case 2:
            getPromedioFinal(arregloAlumnos)
            break;
        case 3:
            
            break;
        case 4:
            
            break;
        default:
            break;
    }
}

let arregloAlumnos = []

inicial(arregloAlumnos)











function sumarNotas(){
    let suma = 0
    for (let index = 1; index <=6; index++) {
        let nota
        while (true) {
            nota = parseFloat(prompt("Ingrese nota de la asignatura N° " + index))
            if(!isNaN(nota)){
                suma = suma + nota
                break
            }else{
                alert("Dato no válido, por favor ingrese un número")
            }
        }
    }
    return suma
}

function promedioAlumno(sumaTotal) {
    
    let promedio = sumaTotal/6
    return promedio 
}

function isApproved(promedioFinal) {
    if (promedioFinal<4) {
        return false
    } else {
        return true
    }
}

function nivelAprobacion(notaFinal) {
    if (notaFinal<5) {
        return "aprobado"        
    } else if (notaFinal<6) {
        return "aprobado con distinción"
    } else {
        return "aprobado con distinción máxima"
    }
}

function mensajeFinal(isApproved, resultadoFinal, nivelAprobacion, nombreAlumno) {
    if (isApproved) {
        alert("al alumno " + nombreAlumno + " está " + nivelAprobacion + " y su nota final es " + resultadoFinal)
    } else {
        alert("El alumno "+ nombreAlumno + " reprobó con nota final " + resultadoFinal)
    }
}

// let sumaTotal = sumarNotas()

// let resultadoFinal = promedioAlumno(sumaTotal)

// let resultado = isApproved(resultadoFinal)

// let aprobacion = nivelAprobacion(resultadoFinal)


// mensajeFinal(resultado, resultadoFinal, aprobacion, nombreAlumno)

// console.log(nombreAlumno)
// console.log(resultadoFinal)
// console.log(resultado)
// console.log(aprobacion)
