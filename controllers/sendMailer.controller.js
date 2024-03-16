const nodemailer = require("nodemailer");
const { transporter } = require("../util/mailer");
const { pfp_template } = require("../util/templates");

const sendMailer = async (req, res) => {
    try {
        const email = req.body.email;
        const influencerName = req.body.influencerName;
        const discountCode = req.body.discountCode;

        transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });

        const info = await transporter.sendMail({
            from: '"Pistons Fuel Power Support" <support@pistonsfuelpower.com>', // sender address
            to: email, // list of receivers
            subject: "Account authorization and promotional code assignment", // Subject line
            text: "Thank you very much for being part of this project", // plain text body
            html: pfp_template(influencerName, discountCode, 'Aa12345678*'), // html body
        });

        res.send({
            info
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = {
    sendMailer
}