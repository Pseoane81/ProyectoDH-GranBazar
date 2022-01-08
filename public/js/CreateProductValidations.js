const formulario = document.getElementById("formulario-product")
const inputs = document.querySelectorAll("#formulario-product input")

const expresiones = {
	name: /^[a-zA-Z0-9]{5,30}$/, // Letras, numeros
	description: /^[a-zA-ZÀ-ÿ\s]{20,30}$/, // Letras y espacios, pueden llevar acentos.
	measurements:/^[a-zA-ZÀ-ÿ\s]{2,30}$/, // Letras y espacios, pueden llevar acentos.	
	price: /^[0-9]*$/ // 7 a 14 numeros.
}

const campos = {
    name: false,
    measurements: false,
    price: false,
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "name":
            validarCampo(expresiones.name, e.target, "name")
        break;
        case "measurements":
            validarCampo(expresiones.measurements, e.target, "measurements")
        break;
        case "price":
            validarCampo(expresiones.price, e.target, "price")
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo_${campo}`).classList.remove("formulario_grupo_incorrecto")
        document.getElementById(`grupo_${campo}`).classList.add("formulario_grupo_correcto")
        document.querySelector(`#grupo_${campo} i`).classList.add("fa-check-circle")
        document.querySelector(`#grupo_${campo} i`).classList.remove("fa-times-circle")
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.remove("formulario_input_error_activo")
        campos[campo]=true
    } else {
        document.getElementById(`grupo_${campo}`).classList.add("formulario_grupo_incorrecto")
        document.getElementById(`grupo_${campo}`).classList.remove("formulario_grupo_correcto")
        document.querySelector(`#grupo_${campo} i`).classList.add("fa-times-circle")
        document.querySelector(`#grupo_${campo} i`).classList.remove("fa-check-circle")
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add("formulario_input_error_activo")
        campos[campo]=false


    }
}


inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
})



formulario.addEventListener("submit", (e) => {
    //e.preventDefault();        
    
});

