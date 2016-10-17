"use strict";
var Boom = require('boom'),
    soap = require('soap'),
    LogClient = require('../clients/log'),
    BaseController = require('./BaseController.js');


/**
 * Base soap controller
 * It contains all methods that allows to access external REST APIs
 */
class BaseSOAPController extends BaseController {
    constructor(options){
        super();
        this.wsdl = options.wsdl;
        this.wsdlOptions = options.wsdlOptions || {};
        this.xmlnsInEnvelope = options.xmlnsInEnvelope || [];
    }

    /**
     *  It returns the wsdl of the target service
     */
    GetWSDLUrl() {
        return this.wsdl;
    }

    /**
     *  It returns the wsdl options
     */
    GetWSDLOptions() {
        return this.wsdlOptions;
    }


    /**
     * it creates a soap client entity to be used to request soap service
     */
    CreateSoapClient(){
        return new Promise((resolve,reject) => {
            soap.createClient(this.GetWSDLUrl(), this.GetWSDLOptions(), (err, client) => {
                if(err){
                    LogClient.Log({
                        level: 'ERROR',
                        category: "information",
                        message: `Error accessing service with wsdl ${this.wsdl}: ${err.message}`
                    });
                    reject(err);
                }
                else{
                    this.xmlnsInEnvelope.forEach((element)=>{
                        client.wsdl.definitions.xmlns[element.name] = element.value;
                    });
                    client.wsdl.xmlnsInEnvelope = client.wsdl._xmlnsMap();
                    resolve(client);
                }
            })
        })
    }

    /**
     * it makes a SOAP request to the soap client previously created
     * @param client, soap client that allows to request service
     * @param requestOptions: arguments to make the soap request like method and data
     */
    SoapClientRequest(client, requestOptions){
        client.addSoapHeader(requestOptions.headers);
        return new Promise((resolve, reject)=>{
            client[requestOptions.method](requestOptions.body, function(err, result) {
                if(err) {
                    LogClient.Log({
                        level: 'ERROR',
                        category: "information",
                        message: `Error requesting soap method ${requestOptions.method}: ${err.message}`
                    });
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        })
    }

    /**
     *  It makes a SOAP request
     * @param requestOptions: arguments to make the soap request like method and data
     */
    MakeSoapRequest(requestOptions) {
        return this.CreateSoapClient()
            .then((client) => {
                return this.SoapClientRequest(client, requestOptions);
            });
    }


}
module.exports = BaseSOAPController;