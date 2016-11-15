import ApplicationComponent from './application_component';
import Recorder from 'recorderjs';
import Toggle from 'material-ui/Toggle';
import request from '../api_client';
import { messageAction } from '../context';

export default class RecorderConsole extends ApplicationComponent {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false,
            recording: false
        };

        this.audioContext = null;
        this.recorder = null;

        this.bindToSelf('toggleRecording', 'startRecording', 'stopRecording');
    }

    componentDidMount() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;

            this.audioContext = new AudioContext;
        } catch (e) {
            console.log('No web audio support in this browser!');
            return;
        }

        let startUserMedia = (stream) => {
            var input = this.audioContext.createMediaStreamSource(stream);
            this.recorder = new Recorder(input);
            console.log('Recorder initialised.');
            this.setState({initialized: true});
        };
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, startUserMedia, function (error) {
                console.log('No live audio input: ' + error);
            });
        } else {
            navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            }).then(startUserMedia).catch(function (error) {
                console.log('No live audio input: ' + error);
            });
        }
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
            this.recorder.getBuffer((buffers) => {
                var newSource = this.audioContext.createBufferSource();
                var newBuffer = this.audioContext.createBuffer(2, buffers[0].length, this.audioContext.sampleRate);
                newBuffer.getChannelData(0).set(buffers[0]);
                newBuffer.getChannelData(1).set(buffers[1]);
                newSource.buffer = newBuffer;

                newSource.connect(this.audioContext.destination);
                newSource.start(0);
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

