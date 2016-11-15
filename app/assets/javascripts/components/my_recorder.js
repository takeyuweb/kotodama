import ApplicationComponent from './application_component';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RecorderConsole from './recorder_console';

export default class MyRecorder extends ApplicationComponent {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <RecorderConsole />
            </MuiThemeProvider>
        );
    }
}

