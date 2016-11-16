import { EventEmitter } from 'events'
import { AudioContextConstants } from '../constants/audio_context_constants';

export default class AudioContextStore extends EventEmitter {
    constructor(dispatcher) {
        super();
        this._audioContext = null;
        this._recorder = null;
        dispatcher.register(this.onAction.bind(this));
    }

    subscribe(actionType, callback) {
        this.on(actionType, callback);
    }

    onAction(action) {
        switch(action.actionType) {
            case AudioContextConstants.INITIALIZED:
                this._audioContext = action.audioContext;
                this.emit(AudioContextConstants.INITIALIZED, this._audioContext);
                break;
            case AudioContextConstants.RECORDER_OPENED:
                this._recorder = action.recorder;
                this.emit(AudioContextConstants.RECORDER_OPENED, this._recorder);
                break;
            default:
            // no op
        }
    }

    get audioContext() {
        return this._audioContext;
    }

    get recorder() {
        return this._recorder;
    }
}

