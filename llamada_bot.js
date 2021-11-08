const Axios = require("axios");
const instancia = Axios.default.create({
  baseURL: "https://bot-orientacion-upiicsa.azurewebsites.net/qnamaker",
  responseType: "json",
  headers: {
    Authorization: "EndpointKey 0fb1c538-f92c-4288-bf5a-770c1e4176c0",
    "Content-Type": "application/json",
  },
});

const llamarBOT = async (pregunta) => {
  return instancia.post(
    "/knowledgebases/7a828086-cd2c-4299-ad2a-ea3b0a961bb8/generateAnswer",
    { question: pregunta }
  );
};

module.exports = { llamarBOT };
