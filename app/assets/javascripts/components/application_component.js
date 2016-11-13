import React from 'react';

export default class ApplicationComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.__bindedMethodNames__ = [];
    }

    bindToSelf(...names) {
        names.forEach(name => {
            if (typeof this[name] !== 'function') {
                console.warn('Missing binding function.: ' + name);
            } else {
                this[name] = this[name].bind(this);
            }
        });
        this.__bindedMethodNames__ = this.__bindedMethodNames__.concat(names);
    }

    unbindBindedMethodFromSelf() {
        this.__bindedMethodNames__.forEach(name => {
            this[name] = null;
        });
        this.__bindedMethodNames__.length = 0;
    }
}

