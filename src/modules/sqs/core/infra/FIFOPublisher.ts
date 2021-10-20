export interface FIFOPublisher{
    sendMessage(messageBody: string |　any, messageDeduplicationId: string, messageGroupId: string): any
}