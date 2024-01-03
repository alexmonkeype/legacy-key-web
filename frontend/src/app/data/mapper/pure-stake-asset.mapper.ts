import { Mapper } from "../../domain/base/mapper";
import { Asset } from "../service/pure-stake-repository/type/asset.type";
import { AssetModel } from "../../domain/model/asset.model";

export class PureStakeAssetMapper extends Mapper<Asset, AssetModel> {
  mapFrom(param: Asset): AssetModel {
    return {
      assetId: param.index,
      name: param.params.name,
    };
  }

  mapTo(param: AssetModel): Asset {
    return {
      index: 0,
      params: {
        name: param.name
      }
    };
  }
}
