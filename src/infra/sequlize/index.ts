import {Card as CardModel} from "./models/Card.models";
import {CardOrder as CardOrderModel} from "./models/CardOrder.model";
import {CardTrade as CardTradeModel} from "./models/CardTrade.model";
import {Trader as TraderModel} from "./models/Trader.model";
import {IdentityUser as IdentityUserModel} from "./models/IdentityUser.model";
import {Sequelize} from "sequelize-typescript";
import {SequelizeOptions} from "sequelize-typescript/dist/sequelize/sequelize/sequelize-options";


export function initSequelize(options: SequelizeOptions) : Sequelize{
    const sequelize: Sequelize = new Sequelize(options)
    sequelize.addModels([CardModel, CardOrderModel, CardTradeModel, TraderModel, IdentityUserModel])
    return sequelize
}