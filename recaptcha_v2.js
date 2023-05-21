//------------- reCAPTCHA v2 ----------------

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
  //----------------Call reCAPTCHA v2------------
  
  /**
   * @description get recaptcha v2 and return recaptcha id
   * @param {string} token get from getToken function
   * @param {string} url "https://app.metabypass.tech/CaptchaSolver/api/v1/services/bypassReCaptcha";
   * @param {object} data object which includes url, sitekey, version 
   * @example data = {
      url: "SITE_URL",
      sitekey: "SITE_KEY",
      version: "2",
   }
   * @return {number} recaptchaId
   */
  
  const getRecaptchaId = async (token, url, data) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, //PUT ACCESS TOKEN HERE
      },
      body: JSON.stringify(data),
    };
  
    let recaptchaId = null;
    let response = await fetch(url, options);
    try {
      const result = await response.json();
      if (result.status_code === 200) {
        recaptchaId = result.data.RecaptchaId;
        return recaptchaId;
      }
      else if (result.status_code === 401) {
        let user = {
          grant_type: "password",
          client_id: "YOUR_CLIENT_ID",
          client_secret: "YOUR_CLIENT_SECRET",
          username: "YOUR_EMAIL",
          password: "YOUR_PASSWORD",
        };
        let oauthUrl = "https://app.metabypass.tech/CaptchaSolver/oauth/token";
        let newToken = await getToken(user, oauthUrl);
        if(newToken !== null || newToken !== undefined){
          getRecaptchaId(newToken, url, data);
        }else
        {
          console.log('Authentication Failed')
        }
      } else {
        console.log(result.status);
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
    * @param {string} token get from getToken function
    * @param {string} url url with query string wich includes recaptcha_id that get from getRecaptchaId function
    * @example "https://app.metabypass.tech/CaptchaSolver/api/v1/services/getCaptchaResult?" +
               new URLSearchParams({ recaptcha_id: recaptchaId });
    * @return {string} reCaptcha response
    
  */
  
  const getRecaptchaResult = async (token, url) => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, //PUT ACCESS TOKEN HERE
      },
    };
  
    // reCaptcha response will be available within the maximum of 100 seconds
    for (let i = 0; i < 10; i++) {
      await delay(10000);
      let response = await fetch(url, options);
      try {
        const result = await response.json();
        if (result.status_code === 200) {
          const reCaptchaResult = result.data.RecaptchaResponse;
          console.log("Result: ", reCaptchaResult);
          return reCaptchaResult;
        } else if (result.status_code === 201) {
          console.log("Result not ready");
        } else if (result.status_code === 401) {
          let user = {
            grant_type: "password",
            client_id: "YOUR_CLIENT_ID",
            client_secret: "YOUR_CLIENT_SECRET",
            username: "YOUR_EMAIL",
            password: "YOUR_PASSWORD",
          };
          let oauthUrl = "https://app.metabypass.tech/CaptchaSolver/oauth/token";
          let newToken = await getToken(user, oauthUrl);
          if(newToken !== null || newToken !== undefined){
          return getRecaptchaResult(newToken, url);
          }else{
            console.log('Authentication Failed')
          }
        } else {
          console.log(result.message);
          break;
        }
      } catch {
        console.log("Invalid request");
      }
    }
  };