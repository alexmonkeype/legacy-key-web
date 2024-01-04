export type Asset = {
  "asset-id": number,
  amount: number
}

export type AccountInfoType = {
  address: string,
  amount: number,
  assets: Asset[]
}
