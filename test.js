


// send mail with defined transport object
  let mailOptions = {
    from: "node@app.hyperbaricpipeline.com", // sender address
    to: "olaokunolalekan@gmail.com", // list of receivers
    subject: "", // Subject line
    text: `Name: ${client.name} <br> From: ${client.email} <br> Body: ${client.message} <br> `, // plain text body
    html: `Name: ${client.name} <br> From: ${client.email} <br> Body: ${client.message} <br> ` // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log("Message sent");
  });


