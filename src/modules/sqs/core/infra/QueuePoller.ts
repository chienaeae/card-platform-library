import {SQSMessage} from "sqs-consumer"
import {QueueMessage} from "./QueueMessage";

export interface IPoller<MessageProps extends QueueMessage>{
    onMessageHandled(messageBody: MessageProps, sqsMessage: SQSMessage);

    onMessageProcessed(messageBody: MessageProps, sqsMessage: SQSMessage);

    onMessageReceived(messageBody: MessageProps, sqsMessage: SQSMessage);

    onError(err);

    start(): void;
}