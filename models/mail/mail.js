const nodemailer = require('nodemailer');

const createTransporter = (recipientEmail) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'svmirame@gmail.com',
            pass: 'rluk rmlx hxka dhit'
        },
    });

    const mailOptions = {
        from: 'svmirame@gmail.com', // Cambiar esto según tu configuración
        to: recipientEmail,
        subject: 'BIENVENIDO A MIRAME',
     
        // Puedes agregar más propiedades según necesites
        html:`
        <p>Te damos la bienvenida a Mirame, será un placer ayudarte. Cualquier consulta nos puedes escribir un correo y con gusto te atenderemos. Recuerda que por medio de Gmail será nuestro medio de comunicación.</p>
        <img src="../img/gmailfirma.jpg" alt="Bienvenido a Mirame">
        <!-- Reemplaza la ruta de la imagen con la URL de tu imagen -->
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Correo enviado con éxito:', info.response);
        }
    });
};

module.exports = createTransporter;
