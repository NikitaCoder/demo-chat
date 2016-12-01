import React from 'react';
import MenuItem from 'material-ui/MenuItem';

class GuestMenu extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <a className="menu_link" href="#/home"><MenuItem onTouchTap={this.props.handleClose}>Home</MenuItem></a>
                <a className="menu_link" href="#/getstarted"><MenuItem onTouchTap={this.props.handleClose}>Get Started</MenuItem></a>
                <a className="menu_link" href="#/register"><MenuItem onTouchTap={this.props.handleClose}>Register</MenuItem></a>
            </div>
        );
    }
}

module.exports=GuestMenu;