const fetch = require("node-fetch");
const getRecaptchaId = async (token, data) => {
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

  console.log("Preparing recaptcha id ...");
  const response = await fetch(url, options);
  try {
    const result = await response.json();
    if (result.status_code === 200) {
      const recaptchaId = result.data.RecaptchaId;
      console.log("reCatptcha id is ===>", recaptchaId);
      return recaptchaId;
    } else if (result.status_code === 401) {
      console.log("token is expired, please log in  again...");
    } else {
      console.log(result.message);
    }
  } catch {
    console.log("Invalid request");
  }
};

//------------------------------ GET RESULT ----------------------------------

// use below promise for wait 10s or use setTimeout method
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
  * @description get recaptcha id and return recaptcha v2 response
  * @param {string} token authentication token
  * @param {recpatchId} number recaptcha id that return from getRecaptchaId function
  * @param {string} url url with query string wich includes recaptcha_id that get from getRecaptchaId function
  * @example "https://app.metabypass.tech/CaptchaSolver/api/v1/services/getCaptchaResult?" +
             new URLSearchParams({ recaptcha_id: recaptchaId });
  * @return {string} reCaptcha response
  
*/

const getRecaptchaResult = async (token, recaptchaId) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`, //PUT ACCESS TOKEN HERE
    },
  };

  // reCaptcha response will be available within the maximum of 100 seconds
  const url =
    "https://app.metabypass.tech/CaptchaSolver/api/v1/services/getCaptchaResult?" +
    new URLSearchParams({ recaptcha_id: recaptchaId });
  console.log("Solving captcha started....");
  for (let i = 0; i < 10; i++) {
    await delay(10000);
    const response = await fetch(url, options);
    try {
      const result = await response.json();
      if (result.status_code === 200) {
        const reCaptchaResult = result.data.RecaptchaResponse;
        // console.log("Result: ", reCaptchaResult);
        return reCaptchaResult;
      } else if (result.status_code === 201) {
        console.log("Result not ready");
      } else if (result.status_code === 401) {
        console.log("token is expired, please log in  again...");
      } else {
        console.log(result.message);
        break;
      }
    } catch {
      console.log("Invalid request");
    }
  }
};

module.exports = {
  getRecaptchaId,
  getRecaptchaResult,
};
