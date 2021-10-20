import {DataType, Sequelize} from "sequelize-typescript";
import {IdentityUser} from "../../models/identityUser/IdentityUser.model";
import {Trader} from "../../models/trader/Trader.model";
import {Card} from "../../models/card/Card.models";
import {CardTrade} from "../../models/cardTrade/CardTrade.model";
import {CardOrder} from "../../models/cardOrdering/CardOrder.model";
import {mockSequelize} from "../../mock/MockSequelize";

import faker from "faker";


describe('Test IdentityUser Model', () => {
    let mockedSequelize: Sequelize;
    let identityUser: IdentityUser
    beforeAll(async () => {
        mockedSequelize = mockSequelize();
        mockedSequelize.addModels([IdentityUser, Trader, Card, CardTrade, CardOrder]);
        identityUser = new IdentityUser({
            user_id: faker.datatype.uuid(),
            username: faker.internet.userName(),
            user_email: faker.internet.email(),
            user_password: faker.internet.password(),
            created_time: faker.date.past(),
            updated_time: faker.date.soon()
        });

    })

    afterEach(async () => {
        jest.clearAllMocks();
        await mockedSequelize.close();
    })

    test('Testing Name and Properties', async () => {
        expect(IdentityUser.isInitialized).toBe(true);
        expect(identityUser).toBeInstanceOf(IdentityUser);
        expect(IdentityUser.tableName).toBe('identity_user');
        ['user_id', 'username', 'user_email', 'user_password', 'created_time', 'updated_time'].forEach(propName => {
            expect(identityUser).toHaveProperty(propName);
        });
    });

});