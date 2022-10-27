import {Mapper} from "../../../core/base/mapper";
import {AssetEntity} from "./asset.entity";
import {AssetModel} from "../../../core/domain/asset.model";

export class PureStakeAssetMapper extends Mapper<AssetEntity, AssetModel>{
    mapFrom(param: AssetEntity): AssetModel {
        return {
            assetId: param.index,
            name: param.params.name,
        };
    }

    mapTo(param: AssetModel): AssetEntity {
        return {
            index: 0,
            params: {
                name: param.name
            }
        };
    }
}
