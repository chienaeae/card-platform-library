import {Table, Column, Model, DataType, BelongsTo} from 'sequelize-typescript';
import {Card} from "../card/Card.models";
import {CardOrder} from "../cardOrdering/CardOrder.model";

interface CardTradeAttributes{
    trade_id: string;
    trade_card_index: string;
    trade_price: number;
    buy_order_id: string;
    sell_order_id: string;

    created_time?: Date;
    updated_time?: Date;
}

@Table({
    timestamps: true,
    tableName: 'card_trade',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time'
})
export class CardTrade extends Model<CardTradeAttributes>{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    public trade_id!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'card',
            key: 'card_index'
        },
        onUpdate: 'cascade',
        onDelete: 'no action'
    })
    public trade_card_index!: number;


    @Column({
        type: DataType.DECIMAL(12,2),
        allowNull: false
    })
    public trade_price!: number;

    @Column({
        type: DataType.UUID,
        allowNull: false,
        references: {
            model: 'card_order',
            key: 'order_id'
        },
        onUpdate: 'cascade',
        onDelete: 'no action'
    })
    public buy_order_id: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
        references: {
            model: 'card_order',
            key: 'order_id'
        },
        onUpdate: 'cascade',
        onDelete: 'no action'
    })
    public sell_order_id: string;

    public readonly created_time!: Date;
    public readonly updated_time!: Date;


    @BelongsTo(() => Card,
        {foreignKey: 'trade_card_index', targetKey: 'card_index', as: 'Card'})
    public trade_card: Card

    @BelongsTo(() => CardOrder,
        {foreignKey: 'buy_order_id', targetKey: 'order_id', as: 'BuyOrder'})
    public buy_order: CardOrder

    @BelongsTo(() => CardOrder,
        {foreignKey: 'sell_order_id', targetKey: 'order_id', as: 'SellOrder'})
    public sell_order: CardOrder

}