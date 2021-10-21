import {OrderingMessageProps} from "./OrderingMessageProps";
import {BaseQueuePoller, Message} from "../core/infra/BaseQueuePoller";


/**
 * 用於限定實作 BaseQueuePoller 後，按照 OrderingMessageProps 當作 message 型態。
 */
export abstract class OrderingQueuePoller extends BaseQueuePoller<OrderingMessageProps>{
}

