const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;
const {MAIL_FOR_SENDING} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data)=> {
    const mail = {...data, from: MAIL_FOR_SENDING};
    await sgMail(mail);
    return true;          
}

module.exports = sendMail;