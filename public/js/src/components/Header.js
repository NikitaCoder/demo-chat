import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Badge from 'material-ui/Badge';
import AutoComplete from 'material-ui/AutoComplete';
import UserBar from './UserBar';
import GuestBar from './GuestBar';
import UserMenu from './UserMenu';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
            open: false,
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
        var menu = <GuestBar onTap={this.handleLeftTouchTap} />;
        if(this.props.loggedIn){
            menu = <UserBar onTap={this.handleLeftTouchTap} />;
        }

        return(
            <header>
                {menu}
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    openSecondary={true}
                >
                    <a className="menu_link" href="#/home"><MenuItem onTouchTap={this.handleClose}>Home</MenuItem></a>
                    <a className="menu_link" href="#/getstarted"><MenuItem onTouchTap={this.handleClose}>Get Started</MenuItem></a>
                    <a className="menu_link" href="#/register"><MenuItem onTouchTap={this.handleClose}>Register</MenuItem></a>
                    {this.props.loggedIn ? <UserMenu /> : ""}
                </Drawer>
            </header>
        );
    }
}

export default Header;