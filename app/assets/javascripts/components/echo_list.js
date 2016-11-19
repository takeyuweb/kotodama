import ApplicationComponent from './application_component';
import { List } from 'material-ui/List';
import { echoStore, audioContextStore } from '../context';
import { EchoConstants } from '../constants/echo_constants';
import { AudioContextConstants } from '../constants/audio_context_constants';
import EchoListItem from './echo_list_item';
import request from '../api_client';

export default class EchoList extends ApplicationComponent {
    constructor(props) {
        super(props);
        this.state = {
            echos: []
        };
        this.audioContext = null;
        this.bindToSelf('getAudioContext');
    }

    componentDidMount() {
        echoStore.subscribe(
            EchoConstants.LOAD,
            this.onLoad.bind(this));

        echoStore.subscribe(
            EchoConstants.ADD,
            this.onAdd.bind(this));

        audioContextStore.subscribe(
            AudioContextConstants.INITIALIZED,
            this.getAudioContext);
    }

    getAudioContext(audioContext) {
        this.audioContext = audioContext;
    }

    onLoad(newEchos) {
        let { echos } = this.state;
        echos.length = 0;
        Array.prototype.push.apply(echos, newEchos);
        this.setState({ echos: echos });
    }

    onAdd(echo) {
        let { echos } = this.state;
        echos.unshift(echo);
        this.setState({ echos: echos });
    }

    render() {
        let { echos } = this.state;
        return (
            <List>
                {
                    echos.map((echo, index) => {
                        return (
                            <EchoListItem
                                key={index}
                                echo={echo}>
                            </EchoListItem>
                        );
                    })
                }
            </List>
        );
    }
}

