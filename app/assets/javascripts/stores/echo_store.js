import { EventEmitter } from 'events'
import { EchoConstants } from '../constants/echo_constants';

export default class EchoStore extends EventEmitter {
    constructor(dispatcher) {
        super();
        this.echos = [];
        dispatcher.register(this.onAction.bind(this));
    }

    subscribe(actionType, callback) {
        this.on(actionType, callback);
    }

    onAction(action) {
        switch(action.actionType) {
            case EchoConstants.LOAD:
                let echos = action.echos;
                this.load(echos);
                this.emit(EchoConstants.LOAD, echos);
                break;
            case EchoConstants.ADD:
                let echo = action.echo;
                this.add(echo);
                this.emit(EchoConstants.ADD, echo);
                break;
            default:
                // no op
        }
    }

    load(newEchos) {
        this.echos.splice(0, this.echos.length).push(newEchos);
    }

    add(echo) {
        this.echos.unshift(echo);
    }

    getAll() {
        return this.echos;
    }
}

