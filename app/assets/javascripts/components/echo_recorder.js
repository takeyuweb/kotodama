import React from 'react';
import ApplicationComponent from './application_component';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppHeader from './app_header';
import RecorderConsole from './recorder_console';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
import EchoList from './echo_list';
import AudioContextHandler from './audio_context_handler';
import request from '../api_client';
import { echoAction } from '../context';

export default class EchoRecorder extends ApplicationComponent {
    constructor(props) {
        super(props);
        this.state = {
            responseAt: new Date()
        }
        this.bindToSelf('onRecorded', 'handleChangeTimePicker');
    }

    componentDidMount() {
        let echos = this.props.echos;
        echoAction.load(echos);
    }

    onRecorded(blob) {
        let { responseAt } = this.state;
        var url = URL.createObjectURL(blob);
        console.log(url);
        var data = new FormData();
        data.append('echo[file]', blob);
        data.append('echo[response_at]', responseAt);
        request.post('/echos', data).then((res) => {
            console.log(res);
            echoAction.add(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    handleChangeTimePicker(event, datetime) {
        this.setState({responseAt: datetime});
    }

    render() {
        let { responseAt } = this.state;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppHeader />
                    <Paper style={{paddingBottom: 20}}>
                        <DatePicker
                            hintText="Date"
                            value={responseAt}
                            onChange={this.handleChangeTimePicker}
                        />
                        <TimePicker
                            hintText="Time"
                            value={responseAt}
                            onChange={this.handleChangeTimePicker}
                        />
                        <RecorderConsole onRecorded={this.onRecorded} />
                    </Paper>
                    <EchoList/>
                    <AudioContextHandler />
                </div>
            </MuiThemeProvider>
        );
    }
}
EchoRecorder.propTypes = {
    echos: React.PropTypes.array.isRequired
};
EchoRecorder.defaultProps = {
    echos: []
};
