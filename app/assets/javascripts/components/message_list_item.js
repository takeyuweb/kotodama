import ApplicationComponent from './application_component';
import { ListItem } from 'material-ui/List';

export default class MessageListItem extends ApplicationComponent {
    constructor(props) {
        super(props);
        this.bindToSelf('onClick');
    }

    onClick() {
        let { message } = this.props;
        // TODO: AudioBufferを取得して再生
    }

    render() {
        let { message } = this.props;
        return (
            <ListItem
                primaryText={`${message.id}.wav`}
                secondaryText={message.created_at}
                onClick={this.onClick}>
            </ListItem>
        );
    }
}

