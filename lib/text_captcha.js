const fs = require("fs/promises");
const fetch = require("node-fetch");
/**
 * @description convert file(image) to base64Encoded
 * @param {string} url captcha image url
 * @return {promise} encoded base64 image
 */

const toBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.body;
  await fs.writeFile("image.jpg", blob, (err) => {
    console.log(err);
  });
  const buffer = await fs.readFile("image.jpg");
  const base64data = buffer.toString("base64");
  return base64data;
};
/**
 *
 * @param {string} image captcha image  url
 * @return {string} encoded base64 image
 */
const getBase64Encoded = async (image) => {
  try {
    const result = await toBase64(image);

    return result; // split string to remove data:image/jpeg;base64
  } catch (error) {
    console.error(error);
    return;
  }
  //...
};

/** 
    * @description solve text captcha
    * @param {string} token for authentication
    * @param {object} data IMAGE_BASE64 file (without data:image/jpeg;base64, at beginning of file)) get from getBase64Encoded function
    * @example
        {
          image:image required
          numeric:0 optional  0 : not specified (Default) 
                              1 : captcha contains only numbers
                              2 : captcha contains only letters
                              3 : captcha contains only numbers or only latters
                              4 : captcha must contain both numbers and letters
          
          min_len:0 optional  0 : not specified (Default) 
                              1-20 : minimal number of symbols in captcha

          max_len:  optional  0 : not specified (Default)
                              1-20 : maximal number of symbols in captcha
        }
    * @return {string} captcha answer
  */

const captchaSolver = async (token, data) => {
  const url = "https://app.metabypass.tech/CaptchaSolver/api/v1/services/captchaSolver";
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
  let response = await fetch(url, options);

  try {
    const result = await response.json();
    if (result.status_code === 200) {
      const text = result.data.result;
      return text;
    } else if (result.status_code === 401) {
      console.log("token is expired, please log in again...");
    } else {
      console.log(result.message);
    }
  } catch {
    console.log("Invalid request");
  }
};

module.exports = {
  getBase64Encoded,
  captchaSolver,
};
