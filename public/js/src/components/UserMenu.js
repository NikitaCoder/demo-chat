import React from 'react';
import MenuItem from 'material-ui/MenuItem';

class UserMenu extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                    <a className="menu_link" href="#/notifications"><MenuItem onTouchTap={this.handleClose}>Notifications</MenuItem></a>
                    <a className="menu_link" href="#/profile"><MenuItem onTouchTap={this.handleClose}>Profile</MenuItem></a>
                    <a className="menu_link" href="#/contacts"><MenuItem onTouchTap={this.handleClose}>Contacts</MenuItem></a>
            </div>
        );
    }
}

module.exports=UserMenu;