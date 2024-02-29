const { getAllCodesModel } = require("../models/influencers.model");

const generatorCode = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 6;
    let code = '';

    // Genera un código alfanumérico aleatorio
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    // Verifica si el código generado ya existe en la base de datos
    const [existingCodes] = await getAllCodesModel();
    const codeExists = existingCodes.some(existingCode => existingCode === code);

    // Si el código ya existe, genera otro código
    if (codeExists) {
        return generatorCode();
    } else {
        return code;
    }
};

module.exports = {
    generatorCode
}