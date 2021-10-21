import {QueueMessage} from "../core/infra/QueueMessage";

export interface OrderingMessageProps {
    orderId: string;
    orderTraderId: string;
    orderStatus: string;
    orderType: string;

}
export class OrderingMessage extends QueueMessage<OrderingMessageProps>{

}