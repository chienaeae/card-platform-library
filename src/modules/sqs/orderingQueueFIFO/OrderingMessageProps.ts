import {QueueMessage} from "../core/infra/QueueMessage";

export interface OrderingMessageProps {
    orderId: string;
    orderTraderId: string;
    orderStatus: number;
    orderType: string;

}
export class OrderingMessage extends QueueMessage<OrderingMessageProps>{

}