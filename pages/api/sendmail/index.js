const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const path = require('path');
const imgUrl = path.join(__dirname, '..', '..', '..', 'public', 'cookingLogo.png');


export default async (req, res) => {
  console.log(req.body);
  const missedIngredientsString = req.body.missedIngredients
    .map((missed) => `${missed.name}`)
    .join("\n");
  const usedIngredientsString = req.body.usedIngredients
    .map((used) => `${used.name}`)
    .join("\n");
  
  const msg = {
    to: req.body.email,
    from: "cookitappkz@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: `Hello, ${req.body.name},
    You executed the recipe with title:
    ${req.body.title}
    You used the following ingredients:
    ${usedIngredientsString}
    You are missing the following ingredients:
    ${missedIngredientsString}
    You may visit the following site to order the missing ingredients.
    <a>https://www.e-food.gr/delivery/menu/efood-market</a>
    Please visit your pantry to edit the quantity of used ingredients.
    
    CookIT App Team`,
    html: `<p>Hello, ${req.body.name},</p>
      <p>You executed the recipe with title:</p>
      <h2><strong>${req.body.title}</strong></h2>
      <p>You used the following ingredients:</p>
      <ul>
      ${usedIngredientsString
        .split("\n")
        .map((ing) => `<li><strong>${ing}</strong></li>`)
        .join("")}
    </ul>
      <p>You are missing the following ingredients:</p>
      <ul>
      ${missedIngredientsString
        .split("\n")
        .map((miss) => `<li><strong>${miss}</strong></li>`)
        .join("")}
    </ul>
    <p>You may order the missing ingredients from <a href="https://www.e-food.gr/delivery/menu/efood-market">efood market</a></p>
      </br>  
      <p><strong>Please visit your pantry to edit the quantity of used ingredients.</strong></p>
      <p>CookIT App Team</p>
      <p align="center">
      <img src="${imgUrl}" alt="CookIt App Image" style="display: block; margin: 0 auto;">
     </p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    res.status(500).send("Failed to send email.");
    console.error(err);
  }
};
