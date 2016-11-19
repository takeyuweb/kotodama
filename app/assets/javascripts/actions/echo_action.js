import { EchoConstants } from '../constants/echo_constants';

export default class EchoAction
{
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    load(echos) {
        this.dispatcher.dispatch({
            actionType: EchoConstants.LOAD,
            echos: echos
        })
    }

    add(echo) {
        this.dispatcher.dispatch({
            actionType: EchoConstants.ADD,
            echo: echo
        });
    }
}
