const fetch = require("node-fetch");
//----------------Call reCAPTCHA v3------------
/**
   * @description get recaptcha v3 and return recaptcha v3 response
   * @param {string} token authentication token
   * @param {object} data object which includes url, sitekey, version 
   * @example data = {
      url: "SITE_URL",
      sitekey: "SITE_KEY",
      version: "3",
   }
   * @return {string} recaptcha response
   */

const getRecaptchaResponse = async (token, data) => {
  const url = "https://app.metabypass.tech/CaptchaSolver/api/v1/services/bypassReCaptcha";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`, //PUT ACCESS TOKEN HERE
    },
    body: JSON.stringify(data),
  };

  console.log("solving....");
  const response = await fetch(url, options);

  try {
    const result = await response.json();
    if (result.status_code === 200) {
      const reCaptchaResult = result.data.RecaptchaResponse;
      return reCaptchaResult;
    } else if (result.status_code === 401) {
      console.log("token is expired, please log in  again...");
    } else {
      console.log(result.message);
    }
  } catch {
    console.log("Invalid request");
  }
};
module.exports = { getRecaptchaResponse };
