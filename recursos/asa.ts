import algosdk from 'algosdk'

export const createASA = async(
  algodClient: algosdk.Algodv2,
  signerMnemo: string,
  
) => {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do()
    const signer = await algosdk.mnemonicToSecretKey(signerMnemo)

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      decimals:3,
      total:10000000,
      from: signer.addr,
      defaultFrozen: false,
      unitName:"KC",
      assetName:"KeyCoin",
      suggestedParams
    })

    const signedTx = txn.signTxn(signer.sk)
    const tx = await algodClient.sendRawTransaction(signedTx).do()
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4)
    console.log('Transaction ID: '+tx.txId+'-----Asset ID: '+confirmedTxn['asset-index'])

  } catch (err) {
    console.log('err', err)
  }
}

export const optinASA = async(
  algodClient: algosdk.Algodv2,
  signerMnemo: string,
  asaId: number
) => {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do()
    const signer = await algosdk.mnemonicToSecretKey(signerMnemo)

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: signer.addr,
      to: signer.addr,
      amount: 0,
      assetIndex: asaId,
      suggestedParams
    })

    const signedTx = txn.signTxn(signer.sk)
    const tx = await algodClient.sendRawTransaction(signedTx).do()
    await algosdk.waitForConfirmation(algodClient, tx.txId, 4)
    console.log('Transaction ID: '+tx.txId)

  } catch (err) {
    console.log('err', err)
  }
}

export const txASA = async(
  algodClient: algosdk.Algodv2,
  signerMnemo: string,
  receiverAddress: string,
  amount: number,
  asaId: number
) => {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do()
    const signer = await algosdk.mnemonicToSecretKey(signerMnemo)

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: signer.addr,
      to: receiverAddress,
      amount,
      assetIndex: asaId,
      suggestedParams
    })

    const signedTx = txn.signTxn(signer.sk)
    const tx = await algodClient.sendRawTransaction(signedTx).do()
    await algosdk.waitForConfirmation(algodClient, tx.txId, 4)
    console.log('Transaction ID: '+tx.txId)

  } catch (err) {
    console.log('err', err)
  }
}