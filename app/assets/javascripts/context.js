import { Dispatcher } from 'flux';
import MessageAction from './actions/message_action';
import MessageStore from './stores/message_store';

export let dispatcher = new Dispatcher();
export let messageAction = new MessageAction(dispatcher);
export let messageStore = new MessageStore(dispatcher);
