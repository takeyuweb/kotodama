import ApplicationComponent from './application_component';
import { List } from 'material-ui/List';
import { messageStore } from '../context';
import { MessageConstants } from '../constants/message_constants';
import MessageListItem from './message_list_item';
import request from '../api_client';

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
        request.get(`/messages/${message.id}.wav`, {}, {binary: true}).then((res) => {
            var audioData = res;
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            var audioContext = new AudioContext;
            audioContext.decodeAudioData(audioData).then((decodedData) => {
                var source = audioContext.createBufferSource();
                source.buffer = decodedData;
                source.connect( audioContext.destination );
                source.start();
            });
        }).catch((err) => {
            console.log(err);
        });
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

