import { EventEmitter } from 'events'
import { MessageConstants } from '../constants/message_constants';

export default class MessageStore extends EventEmitter {
    constructor(dispatcher) {
        super();
        this.messages = [];
        dispatcher.register(this.onAction.bind(this));
    }

    subscribe(actionType, callback) {
        this.on(actionType, callback);
    }

    onAction(action) {
        switch(action.actionType) {
            case MessageConstants.LOAD:
                let messages = action.messages;
                this.load(messages);
                this.emit(MessageConstants.LOAD, messages);
                break;
            case MessageConstants.ADD:
                let message = action.message;
                this.add(message);
                this.emit(MessageConstants.ADD, message);
                break;
            default:
                // no op
        }
    }

    load(newMessages) {
        this.messages.splice(0, this.messages.length).push(newMessages);
    }

    add(message) {
        this.messages.unshift(message);
    }

    getAll() {
        return this.messages;
    }
}

