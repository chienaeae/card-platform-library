import {BaseQueueClient, MetaConfig, QueueConfig} from "./BaseQueueClient";
import {Consumer, SQSMessage} from "sqs-consumer"

export type Message = SQSMessage;

export abstract class BaseQueuePoller<MessageProps> extends BaseQueueClient{
    protected poller?: Consumer;

    protected constructor(config: QueueConfig & MetaConfig) {
        super({...config}, {...config});
        this.poller = Consumer.create({
            queueUrl: this.queueConfig.queueUrl,
            sqs: this.client,
            handleMessage: async (message: SQSMessage) => {
                this.onMessageHandled(JSON.parse(message.Body) as MessageProps, message as Message)
            }
        });
        this.onEventReady();
    }

    private onEventReady(){
        this.poller.on('message_received', (message) => this.onMessageReceived(JSON.parse(message.Body) as MessageProps, message as Message));
        this.poller.on('message_processed', (message) => this.onMessageProcessed(JSON.parse(message.Body) as MessageProps, message as Message));
        this.poller.on('error', (error) => this.onError(error));
    }


    abstract onError(err);

    abstract onMessageHandled(messageBody: MessageProps, sqsMessage: Message);

    abstract onMessageProcessed(messageBody: MessageProps, sqsMessage: Message);

    abstract onMessageReceived(messageBody: MessageProps, sqsMessage: Message);

    abstract start(): void;

}