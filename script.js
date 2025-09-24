function validar() {
  const emailInput = document.getElementById("email");
  const hexInput = document.getElementById("hex");
  const decimalInput = document.getElementById("decimal");

  const emailResultDiv = document.getElementById("emailResult");
  const hexResultDiv = document.getElementById("hexResult");
  const decimalResultDiv = document.getElementById("decimalResult");

  // Expresiones regulares:
  const emailRegex1 = /^[a-z]+\d{1,2}@curnvirtual\.edu\.co$/;
  const emailRegex2 = /^[aeiou][a-z]*[._][a-z]+@curn\.edu\.co$/;

  const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  const decimalRegex = /^(0,[0-9]|[1-4],[0-9]|5,0)$/;

  function validarEmail(val) {
    return emailRegex1.test(val) || emailRegex2.test(val);
  }

  // Esta función solo valida si hay texto; si está vacío, no muestra error ni válido
  function checkFieldOptional(inputElem, validator, resultDiv, fieldName) {
    const val = inputElem.value.trim();

    if (val === "") {
      // Limpia mensajes y estilos si está vacío
      inputElem.classList.remove("error");
      resultDiv.innerHTML = "";
      return true;  // Consideramos válido porque no hay nada que validar
    }

    if (typeof validator === "function") {
      if (!validator(val)) {
        inputElem.classList.add("error");
        resultDiv.innerHTML = `<span class="invalid">✘ ${fieldName} inválido.</span>`;
        return false;
      }
    } else {
      if (!validator.test(val)) {
        inputElem.classList.add("error");
        resultDiv.innerHTML = `<span class="invalid">✘ ${fieldName} inválido.</span>`;
        return false;
      }
    }

    inputElem.classList.remove("error");
    resultDiv.innerHTML = `<span class="valid">✔ ${fieldName} válido.</span>`;
    return true;
  }

  const emailValid = checkFieldOptional(emailInput, validarEmail, emailResultDiv, "Correo Institucional");
  const hexValid = checkFieldOptional(hexInput, hexRegex, hexResultDiv, "Número Hexadecimal");
  const decimalValid = checkFieldOptional(decimalInput, decimalRegex, decimalResultDiv, "Número Decimal");

  return emailValid && hexValid && decimalValid;
}
