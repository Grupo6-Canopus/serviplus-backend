const ClienteModelo = require ("../modelos/ClienteModelo");
const bcrypt = require ("bcrypt");
const { json } = require("express");
const LoginClientesOperaciones = {};

const compararPassw = async (recibido, guardado) => {
    return await bcrypt.compare (recibido, guardado);
}

LoginClientesOperaciones.login = async (req, res) => {
    try {
        const email = req.body.email;
        let passw = req.body.passw;
        const usuario = await ClienteModelo.findOne ({email: email});
        if (usuario != null) {
            const result = await compararPassw (passw, usuario.passw);
            if (result) {
                const acceso = {
                    nombres: usuario.nombres+" "+usuario.apellidos,
                }
                rest.status(200).json(acceso);
            }
            else {
                rest.status(401).send("Correo electrónico o contraseña invalidos");
            }
        }
    } catch (error) {
        console.log(error);
        rest.status(400).json(error);
    }
}