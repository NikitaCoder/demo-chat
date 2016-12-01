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
import GuestMenu from './GuestMenu';

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
                <div style={{textAlign: 'center'}} >
                    
                    {this.props.loggedIn ? <UserMenu handleClose={this.handleClose} /> : <GuestMenu handleClose={this.handleClose} />}
                </div>
                </Drawer>
            </header>
        );
    }
}

export default Header;