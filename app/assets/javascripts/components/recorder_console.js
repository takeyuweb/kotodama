import ApplicationComponent from './application_component';
import Toggle from 'material-ui/Toggle';
import request from '../api_client';
import { messageAction, audioContextStore } from '../context';
import { AudioContextConstants } from '../constants/audio_context_constants';

export default class RecorderConsole extends ApplicationComponent {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false,
            recording: false
        };

        this.audioContext = null;
        this.recorder = null;

        this.bindToSelf('getRecorder', 'toggleRecording', 'startRecording', 'stopRecording');
    }

    componentDidMount() {
        audioContextStore.subscribe(
            AudioContextConstants.RECORDER_OPENED,
            this.getRecorder);
    }

    getRecorder(recorder) {
        this.recorder = recorder;
        this.setState({initialized: true});
    }

    toggleRecording(e, isInputChecked) {
        if (isInputChecked) {
            this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    startRecording() {
        this.recorder && this.recorder.record();
        console.log('Recording...');
        this.setState({
            recording: true
        });
    }

    stopRecording() {
        this.setState({
            recording: false
        });

        if (this.recorder) {
            this.recorder.stop();
            this.recorder.exportWAV((blob) => {
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
            });
            this.recorder.clear();
        }

        console.log('Stopped recording.');
    }

    render() {
        let {initialized} = this.state;
        return (
            <div style={{maxWidth: 250}}>
                <Toggle
                    label="Record"
                    onToggle={this.toggleRecording}
                    disabled={!initialized}
                />
            </div>
        );
    }
}

