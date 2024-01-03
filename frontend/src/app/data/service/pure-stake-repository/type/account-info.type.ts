export type Asset = {
  "asset-id": number,
  amount: number
}

export type AccountInfo = {
  address: string,
  amount: number,
  assets: Asset[]
}
