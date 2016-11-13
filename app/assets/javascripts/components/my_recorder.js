import ApplicationComponent from './application_component';
import Recorder from 'recorderjs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class MyRecorder extends ApplicationComponent
{
    constructor(props) {
        super(props);

        this.state = {
            recording: false
        };

        this.audioContext = null;
        this.recorder = null;

        this.bindToSelf( 'startRecording', 'stopRecording' );
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
        };
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, startUserMedia, function(error) {
                console.log('No live audio input: ' + error);
            });
        } else {
            navigator.mediaDevices.getUserMedia({video: false, audio: true}).then(startUserMedia).catch(function (error) {console.log('No live audio input: ' + error);});
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
            });
            this.recorder.getBuffer((buffers) => {
                var newSource = this.audioContext.createBufferSource();
                var newBuffer = this.audioContext.createBuffer( 2, buffers[0].length, this.audioContext.sampleRate );
                newBuffer.getChannelData(0).set(buffers[0]);
                newBuffer.getChannelData(1).set(buffers[1]);
                newSource.buffer = newBuffer;

                newSource.connect( this.audioContext.destination );
                newSource.start(0);
            });
            this.recorder.clear();
        }

        console.log('Stopped recording.');
    }

    render() {
        let { recording } = this.state;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <RaisedButton
                        label="Record"
                        disabled={recording}
                        onClick={this.startRecording}/>
                    <RaisedButton
                        label="Stop"
                        disabled={!recording}
                        onClick={this.stopRecording}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

window.MyRecorder = MyRecorder;
