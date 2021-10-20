export class QueueMessage<MessageProps>{
    private readonly props: MessageProps;
    constructor(props: MessageProps) {
        this.props = props;
    }

    public stringify(): string{
        return JSON.stringify(this.props)
    }
}