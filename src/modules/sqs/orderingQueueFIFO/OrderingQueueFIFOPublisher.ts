import {AWSError} from "aws-sdk";
import {BaseQueueClient, MetaConfig, QueueConfig} from "../core/infra/BaseQueueClient";
import {OrderingMessage, OrderingMessageProps} from "./OrderingMessageProps";
import {FIFOPublisher, PublishedMessageResult} from "../core/infra/interfaces/FIFOPublisher";


export class OrderingQueueFIFOPublisher extends BaseQueueClient implements FIFOPublisher<OrderingMessage> {
    constructor(config: QueueConfig & MetaConfig) {
        super({...config}, {...config});
    }

    async sendMessage(messageBody: OrderingMessageProps, messageDeduplicationId: string, messageGroupId: string): Promise<PublishedMessageResult> {
        return new Promise(async (resolve, reject) => {
            this.client.sendMessage({
                QueueUrl: this.queueConfig.queueUrl,
                MessageBody: new OrderingMessage(messageBody).stringify(),
                MessageDeduplicationId: messageDeduplicationId,
                MessageGroupId: messageGroupId,
            }, (err: AWSError, data: PublishedMessageResult) => {
                if (err) {
                    console.log(`Sent message sqs queue with error: ${err.message}`)
                    reject(err);
                }
                resolve(data);
            })
        })
    }

    public static create(config: QueueConfig & MetaConfig) {
        new OrderingQueueFIFOPublisher({...config})
    }
}