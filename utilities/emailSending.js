var emailSenderOptions = {
  service: "gmail",
  auth: {
    user: "",
    api_key: process.env.EMAIL_SENDER_KEY,
  },
};
var gmailClient = nodemailer.createTransport(sgTransport(emailSenderOptions));

const sendOrderMail = (order) => {
  const { userEmail, orderInfo, totalPrice, firstName, formattedDate } = order;
  const email = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "your order is confirm",
    text: "your order is confirm",
    html: `
      <div>
        <p>Hello ${firstName},</p>
        <h2>Your order is confirm</h2>
        <p>you have ordered:</p>
        <ul>
          ${orderInfo.map((item) => `<li>${item?.productName}</li>`)}
       </ul>
       <p>Total Price: ${totalPrice}</p>
       <h4>Best Regards</h4>
       <p><a href="https://aws-ac1fd.firebaseapp.com">aws</a> spread Team</p>
      </div>
      `,
  };
  gmailClient.sendMail(email, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("payment Message sent ", info.message);
    }
  });
};

const sendOrderConfirmEmail = (order) => {
  const { userEmail, orderInfo, totalPrice, firstName, transactionId } = order;
  const productName = orderInfo.map((item) => item?.productName);
  const email = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "your payment is Completed",
    text: "your payment is Completed",
    html: `
      <div>
        <p>Hello ${firstName},</p>
        <h2>your payment is Completed</h2>
        <p>you have ordered:</p>
        <ul>
        ${orderInfo.map((item) => `<li>${item?.productName}</li>`)}
       </ul>
       <p>You paid the total amount: ${totalPrice}</p>
       <span>your transaction Id: ${transactionId}</span>
       <h4>Best Regards</h4>
       <p><a href="https://aws-ac1fd.firebaseapp.com">aws</a> spread Team</p>
      </div>
      `,
  };
  gmailClient.sendMail(email, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent ", info.message);
    }
  });
};

module.exports = { sendOrderConfirmEmail, sendOrderMail };
