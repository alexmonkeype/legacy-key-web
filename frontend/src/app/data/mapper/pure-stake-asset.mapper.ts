import { Mapper } from "../../domain/base/mapper";
import { AssetType } from "../service/pure-stake-repository/type/asset.type";
import { Asset } from "../../domain/model/asset.model";

export class PureStakeAssetMapper extends Mapper<AssetType, Asset> {
  mapFrom(param: AssetType): Asset {
    return {
      assetId: param.index,
      name: param.params.name,
    };
  }

  mapTo(param: Asset): AssetType {
    return {
      index: 0,
      params: {
        name: param.name
      }
    };
  }
}
