/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
var http = require('http');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Bienvenido a mi casa';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('mi casa', speechText)
      .getResponse();
  },
};

const MiraTemperaturaIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'MiraTemperaturaIntent';
  },
  async handle(handlerInput) {
    
    const response = await httpGetCorreo();
    
    return handlerInput.responseBuilder
            .speak(response.respuesta)
            .getResponse();
  },
};

const MiraCorreoIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'MiraCorreoIntent';
  },
  async handle(handlerInput) {
    
    const response = await httpGetCorreo();
    
    return handlerInput.responseBuilder
            .speak(response.num)
            .getResponse();
  },
};


const ordenaRMIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'ordenaRMIntent';
  },
  async handle(handlerInput) {
    
    var cosa = handlerInput.requestEnvelope.request.intent.slots.cosa.value;

    const response = await httpGetNode(cosa);
    
    return handlerInput.responseBuilder
            .speak(cosa)
            .reprompt("dime")
            .getResponse();
  },
};


function httpGetCorreo() {
  return new Promise(((resolve, reject) => {
    var options = {
        host: 'masancam.ddns.net',
        port: 1880,
        path: '/em',
        method: 'GET',
    };
 
   const request = http.request(options, (response) => {
      response.setEncoding('utf8');
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    request.end();
  }));
}


function httpGetNode(cosa) {
  return new Promise(((resolve, reject) => {
  
  var cam = "/nada";
  
  if (cosa.indexOf("pon la tele") > -1) cam = '/tv_on_off';
  if (cosa.indexOf("quita la tele") > -1) cam = '/tv_on_off';
  if (cosa.indexOf("sube la tele") > -1) cam = '/tv_up';
  if (cosa.indexOf("baja la tele") > -1) cam = '/tv_dw';
  if (cosa.indexOf("canal anterior") > -1) cam = '/tv_pv';
  if (cosa.indexOf("siguiente canal") > -1) cam = '/tv_nx';
  if (cosa.indexOf("silencio") > -1) cam = '/tv_mute_on_off';
  if (cosa.indexOf("enciende la tele") > -1) cam = '/tv_on_off';
  if (cosa.indexOf("apaga la tele") > -1) cam = '/tv_on_off';
  if (cosa.indexOf("sube el volumen") > -1) cam = '/tv_up';
  if (cosa.indexOf("baja el volumen") > -1) cam = '/tv_dw';
  
  if (cosa.indexOf("pon el aire") > -1) cam = '/aire_on_off';
  if (cosa.indexOf("quita el aire") > -1) cam = '/aire_on_off';
  if (cosa.indexOf("enciende el aire") > -1) cam = '/aire_on_off';
  if (cosa.indexOf("apaga el aire") > -1) cam = '/aire_on_off';
  if (cosa.indexOf("sube el aire") > -1) cam = '/aire_up';
  if (cosa.indexOf("baja el aire") > -1) cam = '/aire_dw';
  if (cosa.indexOf("mueve el aire") > -1) cam = '/aire_sw';

  if (cosa.indexOf("pon el ventilador") > -1) cam = '/vent_on_off';
  if (cosa.indexOf("quita el ventilador") > -1) cam = '/vent_on_off';
  if (cosa.indexOf("enciende el ventilador") > -1) cam = '/vent_on_off';
  if (cosa.indexOf("apaga el ventilador") > -1) cam = '/vent_on_off';
  if (cosa.indexOf("sube el ventilador") > -1) cam = '/vent_up';
  if (cosa.indexOf("baja el ventilador") > -1) cam = '/vent_dw';
  if (cosa.indexOf("mueve el ventilador") > -1) cam = '/vent_sw';
  
  if (cosa.indexOf("adelante rumba") > -1) cam = '/roomba_foreward';
  if (cosa.indexOf("derecha rumba") > -1) cam = '/roomba_right';
  if (cosa.indexOf("izquierda rumba") > -1) cam = '/roomba_left';
  if (cosa.indexOf("limpia rumba") > -1) cam = '/roomba_clean';
  if (cosa.indexOf("limpia bien rumba") > -1) cam = '/roomba_spot';

    var options = {
        host: 'masancam.ddns.net',
        port: 1880,
        path: cam,
        method: 'GET',
    };
    
    const request = http.request(options, (response) => {
      response.setEncoding('utf8');
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    request.end();
  }));
}


const TelNombreIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TelNombreIntent';
  },
  handle(handlerInput) {
   var nominus = handlerInput.requestEnvelope.request.intent.slots.nombre.value;
   var respuesta = "el teléfono de " + nominus + " es el ";
   
   switch (nominus)
     {
       case "josé":
          respuesta = respuesta + "6 4 7 9 3 2 6 5 9"; break;
       case "mary":
          respuesta = respuesta + "6 1 7 0 4 3 1 8 7"; break;
       case "piedad":
          respuesta = respuesta + "6 7 5 7 6 2 4 2 0"; break;
       case "juan":
          respuesta = respuesta + "6 9 6 3 7 0 5 6 0"; break;
       case "bárbara":
          respuesta = respuesta + "6 6 4 5 4 3 1 0 8"; break;
       default:
          respuesta = "No tengo el teléfono de " + nominus;
     }
  
   const speechText = respuesta;
    
   return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('mi casa', speechText)
      .getResponse();
  },
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Puedes pedir los teléfonos mas frecuentes, la temperatura en casa, el correo y manejar la tele, el ventilador y el aire acondicionado';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('mi casa', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Adios, que tengas un buen dia';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('mi casa', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('No entiendo lo que dices')
      .reprompt('repite')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    TelNombreIntentHandler,
    MiraTemperaturaIntentHandler,
    MiraCorreoIntentHandler,
    ordenaRMIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();