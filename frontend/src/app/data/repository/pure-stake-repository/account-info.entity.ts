export interface Asset {
    "asset-id": number,
    amount: number
}

export interface AccountInfoEntity {
    address: string,
    amount: number,
    assets: Asset[]
}
