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
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleLeftTouchTap}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    openSecondary={true}
                >
                    <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>
            </header>
        );
    }
}

export default Header;