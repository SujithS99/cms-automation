import * as crypto from "crypto";
import Constants from "./constant";

export default function encryptPayload(payload) 
{
  let key = Constants.KEY;
  let secretiv = Constants.IV;
  let algorithm = Constants.ALOGORITHM;
  
  let keystring = crypto.createHash('sha256').update(String(key)).digest('hex').substr(0, 32);
  let ivv = crypto.createHash('sha256').update(String(secretiv)).digest('hex').substr(0, 16);

  const cipher = crypto.createCipheriv(algorithm, keystring,ivv);
  const encrypted = cipher.update(payload, 'utf8', 'base64') + cipher.final('base64');
  return encrypted;
}


