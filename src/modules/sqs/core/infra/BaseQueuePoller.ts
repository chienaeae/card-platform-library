import {BaseQueueClient, MetaConfig, QueueConfig} from "./BaseQueueClient";
import {Consumer, SQSMessage} from "sqs-consumer"

export type Message = SQSMessage;

export abstract class BaseQueuePoller<MessageProps> extends BaseQueueClient {
    protected poller?: Consumer;

    protected constructor(config: QueueConfig & MetaConfig) {
        super({...config}, {...config});
        this.poller = Consumer.create({
            queueUrl: this.queueConfig.queueUrl,
            sqs: this.client,
            handleMessage: async (message: SQSMessage) => {
                await this.onMessageHandled(JSON.parse(message.Body) as MessageProps, message as Message)
            }
        });
        this.onEventReady();
    }

    private onEventReady() {
        this.poller.on('message_received', async (message) => await this.onMessageReceived(JSON.parse(message.Body) as MessageProps, message as Message));
        this.poller.on('message_processed', async (message) => await this.onMessageProcessed(JSON.parse(message.Body) as MessageProps, message as Message));
        this.poller.on('error', async (error) => await this.onError(error));
    }


    abstract onError(err);

    abstract onMessageHandled(messageBody: MessageProps, sqsMessage: Message): Promise<void>;

    abstract onMessageProcessed(messageBody: MessageProps, sqsMessage: Message): Promise<void>;

    abstract onMessageReceived(messageBody: MessageProps, sqsMessage: Message): Promise<void>;

    abstract start(): void;

}