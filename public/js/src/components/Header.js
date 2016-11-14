import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

var style = {
    appBar:{
        position: 'fixed',
    }
};


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
            open: false
        }
        this.handleLeftTouchTap = this.handleLeftTouchTap.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleLeftTouchTap(e){
        this.setState({
            open: !this.state.open,
        });
    }

    handleClose(){
        this.setState({
            open: false
        });
    }

    render(){
        return(
            <header>
                <AppBar
                    style={style.appBar}
                    iconClassNameRight="github"
                    onLeftIconButtonTouchTap={this.handleLeftTouchTap}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    openSecondary={true}
                >
                    <MenuItem onTouchTap={this.handleClose}><a className="menu_link" href="/home">Home</a></MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><a className="menu_link" href="/register">Register</a></MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><a className="menu_link" href="/getstarted">Get Started</a></MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><a className="menu_link" href="/conversation">Get Started</a></MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><a className="menu_link" href="/profile">Profile</a></MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><a className="menu_link" href="/contacts">Contacts</a></MenuItem>
                </Drawer>
            </header>
        );
    }
}

export default Header;