import {Card as CardModel} from "./models/card/Card.models";
import {CardOrder as CardOrderModel} from "./models/cardOrdering/CardOrder.model";
import {CardTrade as CardTradeModel} from "./models/cardTrade/CardTrade.model";
import {Trader as TraderModel} from "./models/trader/Trader.model";
import {IdentityUser as IdentityUserModel} from "./models/identityUser/IdentityUser.model";
import {Sequelize, SequelizeOptions} from "sequelize-typescript";

export interface DatabaseCredential {
    username?: string;
    password?: string;
    host?: string;
    database?: string;
    port?: number
}

export interface Models {
    cardModel: typeof CardModel
    cardOrderModel: typeof CardOrderModel;
    cardTradeModel: typeof CardTradeModel;
    traderModel: typeof TraderModel;
    identityUserModel: typeof IdentityUserModel;
}


export class CardPlatformSequel {
    private readonly sequelizeInstance?: Sequelize;

    private constructor(config: DatabaseCredential, overrideOriginConfig?: SequelizeOptions) {
        this.sequelizeInstance = new Sequelize({
            database: config.database,
            username: config.username,
            password: config.password,
            host: config.host,
            dialect: 'mysql',
            port: config.port ? config.port : 3306,
            dialectOptions: {
                multipleStatements: true,
                decimalNumbers: true
            },
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            logging: false,
            ...overrideOriginConfig
        });
        this.sequelizeInstance.addModels([CardModel, CardOrderModel, CardTradeModel, TraderModel, IdentityUserModel])
    }

    get sequelInstance(): Sequelize {
        return this.sequelizeInstance
    }

    get models(): Models {
        return {
            cardModel: CardModel,
            cardOrderModel: CardOrderModel,
            cardTradeModel: CardTradeModel,
            traderModel: TraderModel,
            identityUserModel: IdentityUserModel,
        }
    }

    async authConnection(): Promise<boolean> {
        try {
            await this.sequelizeInstance.authenticate();
            console.log('Connection has been established successfully.');
            return true
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return false
        }
    }

    public static create(config: DatabaseCredential, overrideOriginConfig?: SequelizeOptions): CardPlatformSequel {
        return new CardPlatformSequel(config, overrideOriginConfig)
    }

}
