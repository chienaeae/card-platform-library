import {AWSError, SQS} from "aws-sdk";

export interface MetaConfig {
    apiVersion?: string
    region: string,
}

export interface QueueConfig {
    queueUrl: string,
    queueName: string
}


export abstract class BaseQueueClient {
    protected static readonly API_VERSION = '2012-11-05'
    protected queueConfig: QueueConfig;
    protected client: SQS;

    protected constructor(queueConfig: QueueConfig,
                          metaConfig: MetaConfig) {
        this.queueConfig = queueConfig;
        this.client = new SQS({
            apiVersion: metaConfig.apiVersion ? metaConfig.apiVersion : BaseQueueClient.API_VERSION,
            region: metaConfig.region
        });
    }

    public async authQueuesStatus(): Promise<boolean> {
        return await new Promise( (resolve) => {
            this.client.listQueues(async (err, data) => {
                let authedResult = false
                if (err) {
                    console.log(`Aws connection failed`)
                    resolve( authedResult)
                }
                await data.QueueUrls.forEach(url => {
                    if (url === this.queueConfig.queueUrl) {
                        authedResult = true
                    }
                })
                if (!authedResult){
                    console.log(`Aws sqs queue url doesnt exit`)
                }
                console.log(`Aws has been established successfully.`)
                resolve( authedResult)
            })
        })
    }


}

