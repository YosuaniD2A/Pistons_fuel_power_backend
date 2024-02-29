// Verifica si el ID es un número entero positivo
const isValidId = (id) => {
    return /^\d+$/.test(id);  
};

// Verifica si el código tiene 6 caracteres y contiene al menos una letra y un número
const isValidCode = (code) => {
    return /^[A-Z0-9]{6}$/.test(code) && /[A-Z]/.test(code) && /[0-9]/.test(code); 
};

// Expresión regular para validar el formato del correo electrónico
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports={
    isValidId,
    isValidCode,
    isValidEmail
}