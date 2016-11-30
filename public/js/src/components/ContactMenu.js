import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class ContactMenu extends React.Component{

    render() {
        return (
            <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Send feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
    }
} 

module.exports=ContactMenu;