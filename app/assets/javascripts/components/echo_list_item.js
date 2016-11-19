import ApplicationComponent from './application_component';
import { ListItem } from 'material-ui/List';

export default class EchoListItem extends ApplicationComponent {
    constructor(props) {
        super(props);
        this.bindToSelf('onClick');
    }

    onClick() {
        let { echo } = this.props;
        // TODO: AudioBufferを取得して再生
    }

    render() {
        let { echo } = this.props;
        return (
            <ListItem
                primaryText={`echo/${echo.id}.wav`}
                secondaryText={echo.response_at}
                onClick={this.onClick}>
            </ListItem>
        );
    }
}

