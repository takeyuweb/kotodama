import ApplicationComponent from './application_component';
import { List } from 'material-ui/List';
import { messageStore } from '../context';
import { MessageConstants } from '../constants/message_constants';
import MessageListItem from './message_list_item';

export default class MessageList extends ApplicationComponent {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        messageStore.subscribe(
            MessageConstants.LOAD,
            this.onLoad.bind(this));

        messageStore.subscribe(
            MessageConstants.ADD,
            this.onAdd.bind(this));
    }

    onLoad(newMessages) {
        let { messages } = this.state;
        messages.length = 0;
        Array.prototype.push.apply(messages, newMessages);
        this.setState({ messages: messages });
    }

    onAdd(message) {
        let { messages } = this.state;
        messages.unshift(message);
        // TODO: AudioBufferを取得して再生
        this.setState({ messages: messages });
    }

    render() {
        let { messages } = this.state;
        return (
            <List>
                {
                    messages.map((message, index) => {
                        return (
                            <MessageListItem
                                key={index}
                                message={message}>
                            </MessageListItem>
                        );
                    })
                }
            </List>
        );
    }
}

