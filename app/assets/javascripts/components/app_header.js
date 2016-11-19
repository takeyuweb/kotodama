import React from 'react';
import ApplicationComponent from './application_component';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Turbolinks from 'turbolinks';

export default class AppHeader extends ApplicationComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.bindToSelf('toggleDrawer', 'visitHome', 'visitEcho');
    }

    toggleDrawer() {
        this.setState({ open: !this.state.open });
    }

    visitHome() {
        Turbolinks.visit('/');
        this.setState({ open: false });
    }

    visitEcho() {
        Turbolinks.visit('/echos');
        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <AppBar
                    title="kotodama"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.toggleDrawer}
                />
                <Drawer open={this.state.open}>
                    <MenuItem onTouchTap={this.visitHome}>Home</MenuItem>
                    <MenuItem onTouchTap={this.visitEcho}>Echo</MenuItem>
                </Drawer>
            </div>
        );
    }
}