import ApplicationComponent from './application_component';
import { audioContextAction } from '../context'
import Recorder from 'recorderjs';

export default class AudioContextHandler extends ApplicationComponent {
    constructor(props) {
        super(props);
        this.audioContext = null;
        this.recorder = null;
    }

    componentDidMount() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;

            this.audioContext = new AudioContext;
            audioContextAction.initialized(this.audioContext);
        } catch (e) {
            console.log(e);
            console.log('No web audio support in this browser!');
            return;
        }

        let startUserMedia = (stream) => {
            var input = this.audioContext.createMediaStreamSource(stream);
            this.recorder = new Recorder(input);
            console.log('Recorder initialised.');
            audioContextAction.recorderOpened(this.recorder);
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

    render() {
        return false;
    }

}