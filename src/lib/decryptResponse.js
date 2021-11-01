import * as crypto from "crypto";
import Constants from "./constant";

export default function decryptResponse(encrypted) {
  let key = Constants.KEY
  let secretiv = Constants.IV;
  let algorithm = Constants.ALOGORITHM;

  let keystring = crypto.createHash('sha256').update(String(key)).digest('hex').substr(0, 32);
  let ivv = crypto.createHash('sha256').update(String(secretiv)).digest('hex').substr(0, 16);

  let decipher = crypto.createDecipheriv(algorithm,keystring, ivv)

  let dec = decipher.update(encrypted,"base64",'utf8') 
  dec += decipher.final();

  return JSON.parse(dec);;
}
