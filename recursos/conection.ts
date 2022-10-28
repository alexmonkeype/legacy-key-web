import algosdk from "algosdk";

const token = {"X-API-Key":"szoRVAhgPF1zVTIscOEYU3TmjsM5eqoD4mcwZtlp"}
const server = 'https://testnet-algorand.api.purestake.io/ps2'
const port = ""
export const algodClient = new algosdk.Algodv2(token,server,port);