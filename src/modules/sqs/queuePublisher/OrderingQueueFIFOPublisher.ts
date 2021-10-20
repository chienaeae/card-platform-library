import {SendMessageResult} from "aws-sdk/clients/sqs";
import {AWSError} from "aws-sdk";
import {BaseQueueClient, FIFOPublisher, MetaConfig, QueueConfig} from "../core/infra/BaseQueuePublisher";

export class OrderingQueueFIFOPublisher extends BaseQueueClient implements FIFOPublisher{
    constructor(config: QueueConfig & MetaConfig) {
        super({...config}, {...config});
    }

    async sendMessage(messageBody: string, messageDeduplicationId: string, messageGroupId: string): Promise<SendMessageResult | AWSError> {
        return new Promise(async (resolve, reject) => {
            this.client.sendMessage({
                QueueUrl: this.queueConfig.queueUrl,
                MessageBody: messageBody,
                MessageGroupId: messageDeduplicationId,
                MessageDeduplicationId: messageGroupId
            }, (err: AWSError, data: SendMessageResult) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
        })
    }

    public static create(config: QueueConfig & MetaConfig){
        new OrderingQueueFIFOPublisher({...config})
    }
}