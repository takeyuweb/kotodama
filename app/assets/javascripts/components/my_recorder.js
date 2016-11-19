import React from 'react';
import ApplicationComponent from './application_component';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppHeader from './app_header';
import RecorderConsole from './recorder_console';
import MessageList from './message_list';
import AudioContextHandler from './audio_context_handler';
import request from '../api_client';
import { messageAction } from '../context';

export default class MyRecorder extends ApplicationComponent {
    constructor(props) {
        super(props);
        this.bindToSelf('onRecorded');
    }

    componentDidMount() {
        let messages = this.props.messages;
        messageAction.load(messages);
    }

    onRecorded(blob) {
        var url = URL.createObjectURL(blob);
        console.log(url);
        var data = new FormData();
        data.append('message[file]', blob);
        request.post('/messages', data).then((res) => {
            console.log(res);
            messageAction.add(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppHeader />
                    <RecorderConsole onRecorded={this.onRecorded} />
                    <MessageList/>
                    <AudioContextHandler />
                </div>
            </MuiThemeProvider>
        );
    }
}
MyRecorder.propTypes = {
    messages: React.PropTypes.array.isRequired
};
MyRecorder.defaultProps = {
    messages: []
};
