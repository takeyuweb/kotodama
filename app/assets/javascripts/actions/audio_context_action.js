import { AudioContextConstants } from '../constants/audio_context_constants';

export default class AudioContextAction
{
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    initialized(audioContext) {
        this.dispatcher.dispatch({
            actionType: AudioContextConstants.INITIALIZED,
            audioContext: audioContext
        })
    }

    recorderOpened(recorder) {
        this.dispatcher.dispatch({
            actionType: AudioContextConstants.RECORDER_OPENED,
            recorder: recorder
        });
    }
}
