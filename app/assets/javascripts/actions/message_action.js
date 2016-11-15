import { MessageConstants } from '../constants/message_constants';

export default class MessageAction
{
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    load(messages) {
        this.dispatcher.dispatch({
            actionType: MessageConstants.LOAD,
            messages: messages
        })
    }

    add(message) {
        this.dispatcher.dispatch({
            actionType: MessageConstants.ADD,
            message: message
        });
    }
}
