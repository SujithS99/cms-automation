import Constants from "./constant";

const { API_BASE_URL } = require("../config/settings");

//handling api calls
const apiClient = async (requestPath, method, accessToken = undefined, body = null, query = undefined) => {

  // let headers = {
  //   'Access-Control-Allow-Headers': 'x-auth-token',
  //   'Access-Control-Request-Headers':'*',
  //   'Content-Type' : 'application/x-www-form-urlencoded',
  //   'X-Auth-Token':accessToken
  // };

  if(accessToken) 
  {
    body.access_token = accessToken
  }

  body.decrypt = Constants.DECRYPT;

  
  console.log("API call", requestPath);
 
  return await fetch(
    `${API_BASE_URL}${requestPath}?${new URLSearchParams(query).toString()}`,
    {
      method: method,
      // headers:accessToken?headers:undefined,
      body: body ? new URLSearchParams(body).toString() : undefined,
    }
  ).then((response) => response.json());

};

export default apiClient;