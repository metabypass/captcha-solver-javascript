//------------- IMAGE CAPTCHA ----------------

//first take your access_token (change samples values with your correct values)

/**
 * @description authentication
 * @param {object} user credential use for get token
 * @example
 {
   grant_type: "password",
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    username: "YOUR_EMAIL",
    password: "YOUR_PASSWORD",
 }
 * @param {string} url https://app.metabypass.tech/CaptchaSolver/oauth/token

 * @return {string} token that use for other functions
 */
 const getToken = async (user, url) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  };

  let access_token = null;

  let response = await fetch(url, options);
  try {
    const result = await response.json();
    access_token = result.access_token;
    return access_token;
  } catch {
    console.log("Invalid request");
  }
};

/**
 * @description convert file(image) to base64Encoded
 * @param {blob} file
 * @return {promise} encoded base64 image
 */

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

/**
 *
 * @param {blob} file
 * @return {string} encoded base64 image
 */

const getBase64Encoded = async (file) => {
  try {
    const result = await toBase64(file);
    return result.split[","][1]; // split string to remove data:image/jpeg;base64
  } catch (error) {
    console.error(error);
    return;
  }
  //...
};

/** 
  * @description solve text captcha
  * @param {string} url https://app.metabypass.tech/CaptchaSolver/api/v1/services/captchaSolver
  * @param {string} token access token return from getToken function
  * @param {object} data IMAGE_BASE64 file (without data:image/jpeg;base64, at beginning of file)) get from getBase64Encoded function
  * @example
      {
        image:image
      }
  * @return {string} captcha answer
*/

const captchaSolver = async (url, token, data) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`, //PUT ACCESS TOKEN HERE
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(url, options);
  try {
    const result = await response.json();
    if (result.status_code === 200) {
      const text = result.data.result;
      return text;
    }
    if (result.status_code === 401) {
      let user = {
        grant_type: "password",
        client_id: "YOUR_CLIENT_ID",
        client_secret: "YOUR_CLIENT_SECRET",
        username: "YOUR_EMAIL",
        password: "YOUR_PASSWORD",
      };
      let oauthUrl = "https://app.metabypass.tech/CaptchaSolver/oauth/token";
      let newToken = await getToken(user, oauthUrl);
      if (newToken !== null || newToken !== undefined)
        captchaSolver(url, newToken, data);
      else {
        console.log("Authentication Failed");
      }
    }
  } catch {
    console.log("Invalid request");
  }
};