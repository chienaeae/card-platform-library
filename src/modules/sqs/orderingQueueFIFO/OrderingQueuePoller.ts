import {OrderingMessageProps} from "./OrderingMessageProps";
import {BaseQueuePoller, Message} from "../core/infra/BaseQueuePoller";

/*
* abstract class for implementing
* */
export abstract class OrderingQueuePoller extends BaseQueuePoller<OrderingMessageProps>{
}

