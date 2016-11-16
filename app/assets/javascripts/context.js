import { Dispatcher } from 'flux';
import MessageAction from './actions/message_action';
import MessageStore from './stores/message_store';
import AudioContextAction from './actions/audio_context_action';
import AudioContextStore from './stores/audio_context_store';

export let dispatcher = new Dispatcher();
export let messageAction = new MessageAction(dispatcher);
export let messageStore = new MessageStore(dispatcher);
export let audioContextAction = new AudioContextAction(dispatcher);
export let audioContextStore = new AudioContextStore(dispatcher);
