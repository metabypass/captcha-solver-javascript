const getToken = require("./authentication");
const {captchaSolver,getBase64Encoded} = require("./text_captcha");
const {getRecaptchaId,getRecaptchaResult} = require("./recaptcha_v2")
const {getRecaptchaResponse} = require("./recaptcha_v3")
module.exports ={
    getToken,captchaSolver,getBase64Encoded,getRecaptchaId,getRecaptchaResult,getRecaptchaResponse
}