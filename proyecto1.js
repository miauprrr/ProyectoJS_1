alert("Ingrese el nombre y las 6 notas finales de las asignaturas de su alumno")
let nombreAlumno = prompt("Ingrese nombre del alumno")

function sumarNotas(){
    let suma = 0
    for (let index = 1; index <=6; index++) {
        let nota
        while (true) {
            nota = parseFloat(prompt("Ingrese nota de la asignatura N° " + index))
            if(!isNaN(nota)){
                console.log(nota)
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

let sumaTotal = sumarNotas()

let resultadoFinal = promedioAlumno(sumaTotal)

let resultado = isApproved(resultadoFinal)

let aprobacion = nivelAprobacion(resultadoFinal)


mensajeFinal(resultado, resultadoFinal, aprobacion, nombreAlumno)

console.log(nombreAlumno)
console.log(resultadoFinal)
console.log(resultado)
console.log(aprobacion)
