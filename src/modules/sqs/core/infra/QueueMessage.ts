export abstract class QueueMessage<MessageProps>{
    private readonly props: MessageProps;
    public constructor(props: MessageProps) {
        this.props = props;
    }

    public stringify(): string{
        return JSON.stringify(this.props)
    }

}