const nodemailer = require("nodemailer");
const { transporter } = require("../util/mailer");
const { requests_template } = require("../util/templates");

const sendMailer = async (req, res) => {
    try {
        const email = req.body.email;
        const requests = req.body.requests;

        console.log(requests);

        const htmlRows = requests.map(function(request) {
            return `
                <tr style="height:50px">
                    <td style="padding:0;Margin:0;text-align:center;font-family:manrope, arial, sans-serif;font-size:12px">${request.number}</td>
                    <td style="padding:0;Margin:0;text-align:center;font-family:manrope, arial, sans-serif;font-size:12px">${request.name}</td>
                    <td style="padding:0;Margin:0;text-align:center;font-family:manrope, arial, sans-serif;font-size:12px"><a target="_blank" href="mailto:${request.email}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#44465f;font-size:12px;text-align:center;font-family:manrope, arial, sans-serif">${request.email}</a></td>
                    <td style="padding:0;Margin:0;text-align:center;font-family:manrope, arial, sans-serif;font-size:12px">$${request.amount}</td>
                </tr>`;
        });
    
        const htmlString = htmlRows.join('');

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
            subject: "Payment requests made by influencers", // Subject line
            text: "Thank you very much for being part of this project", // plain text body
            html: requests_template(htmlString), // html body
        });

        res.send({
            info,
            template: requests_template(htmlString)
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