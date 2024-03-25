const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport(
    {
        name: 'hostgator',
        host: "gator3124.hostgator.com",  //Cambiar cuando transfiera el dominio
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "support@pistonsfuelpower.com",
          pass: "Pistons_2024*",
        },
      }
));

module.exports = {
    transporter
}