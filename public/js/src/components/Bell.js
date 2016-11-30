import React from 'react';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Badge from 'material-ui/Badge';
import NotificationStore from '../api/stores/NotificationStore';

class Bell extends React.Component{
    constructor(props){
        super(props);
        this.state=
        {
            open: false,
            count: NotificationStore.getCount(),
            notifications: NotificationStore.getNotifications(),
        }

        this.handleOpenPopup = this.handleOpenPopup.bind(this);
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
        this._onChangeStore = this._onChangeStore.bind(this);
    }

    handleOpenPopup(){
        if(this.state.notifications.length){
              this.setState({
                open: true,
            });
        }
    }

    handleCloseNotification(){
        this.setState({
            open: false,
        })
    }
    componentDidMount(){
        NotificationStore.addChangeListener(this._onChangeStore);
    }

    componentWillUnmount(){
        NotificationStore.removeChangeListener(this._onChangeStore);
    }
    _onChangeStore(){
        this.setState({
            count: NotificationStore.getCount(),
            notifications: NotificationStore.getNotifications(),
        })
    }


    render(){
        var msgs = this.state.notifications.map((obj) =>{
            return (
                <MenuItem primaryText={obj.text} key={obj._id} />
            )
        }) 
        return(
            <div>
                <Badge
                        badgeContent={this.state.count}
                        secondary={this.state.count? true : false}
                        primary={this.state.count? false : true}
                        badgeStyle={{top: 12, right: 12}}
                        >
                         <IconButton
                            iconStyle={{color: '#fff'}}
                            iconClassName="material-icons"
                            tooltip="incoming messages"
                            onTouchTap={this.handleOpenPopup}
                            touch={true}
                            >
                            
                            notifications
                        </IconButton>
                        </Badge>

                    <IconButton
                    iconStyle={{color: '#fff'}}
                    iconClassName="material-icons"
                    tooltip="Your profile"
                    href="#/profile"
                    touch={true}
                    >
                    person
                    </IconButton>
                 
                   <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleCloseNotification}
                            >
                            <Menu>
                               {msgs}
                                <MenuItem primaryText="See all" href="#/notifications" />
                            </Menu>
                            </Popover>
            </div>
        );
    }
}

module.exports = Bell;




