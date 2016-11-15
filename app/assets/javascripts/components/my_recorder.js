import ApplicationComponent from './application_component';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RecorderConsole from './recorder_console';
import MessageList from './message_list';
import { messageAction } from '../context';

export default class MyRecorder extends ApplicationComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let messages = this.props.messages || [];
        messageAction.load(messages);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <RecorderConsole />
                    <MessageList/>
                </div>
            </MuiThemeProvider>
        );
    }
}

