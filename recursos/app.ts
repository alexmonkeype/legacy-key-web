import { algodClient } from "./conection"
import { createAccount } from "./account"
import { txAlgo } from "./algo"
import { createASA, optinASA, txASA } from "./asa"

import * as dotenv from 'dotenv'
dotenv.config()

const mnemo1 = process.env.MNEMO1 as string
const address1 = process.env.ADDR1
const mnemo2 = process.env.MNEMO2 as string
const addres2 = process.env.ADDR2 as string


// createAccount() //crear cuentas con nmonica
// txAlgo(algodClient, mnemo1, addres2, 1000000) //trabsfeir algos entre cuentas
//createASA(algodClient,mnemo1) // crear token
// optinASA(algodClient,mnemo2,113321334) // optin: Permiso para recibir token
// txASA(algodClient,mnemo1,addres2,570,113321334)
