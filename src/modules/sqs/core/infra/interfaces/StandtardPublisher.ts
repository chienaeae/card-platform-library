import {PublishedMessageResult} from "./FIFOPublisher";

export interface StandardPublisher{
    sendMessage(messageBody: string): PublishedMessageResult | Promise<PublishedMessageResult>
}