import {QueueMessage} from "../core/infra/QueueMessage";

export interface OrderingMessageProps {
    orderId: string;
    orderIndex: number;

}
export class OrderingMessage extends QueueMessage<OrderingMessageProps>{

}