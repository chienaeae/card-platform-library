import {SendMessageResult} from "aws-sdk/clients/sqs";
import {AWSError} from "aws-sdk";
import {BaseQueueClient, FIFOPublisher, MetaConfig, QueueConfig} from "../core/infra/BaseQueueClient";
import {QueueMessage} from "../core/infra/QueueMessage";
import {OrderingMessageProps} from "./OrderingMessageProps";




export class OrderingQueueFIFOPublisher extends BaseQueueClient implements FIFOPublisher {
    constructor(config: QueueConfig & MetaConfig) {
        super({...config}, {...config});
    }

    async sendMessage(messageBody: OrderingMessageProps, messageDeduplicationId: string, messageGroupId: string): Promise<SendMessageResult> {
        return new Promise(async (resolve, reject) => {
            this.client.sendMessage({
                QueueUrl: this.queueConfig.queueUrl,
                MessageBody: new QueueMessage<OrderingMessageProps>(messageBody).stringify(),
                MessageDeduplicationId: messageDeduplicationId,
                MessageGroupId: messageGroupId,
            }, (err: AWSError, data: SendMessageResult) => {
                if (err) {
                    console.log(`sent message sqs queue with error [${err.message}] occurred`)
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