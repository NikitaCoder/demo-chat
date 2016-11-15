import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Badge from 'material-ui/Badge';
import AutoComplete from 'material-ui/AutoComplete';


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
            open: false,
            dataSource: [],
        }
        this.handleLeftTouchTap = this.handleLeftTouchTap.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);

    }

    handleLeftTouchTap(e){
        this.setState({
            open: !this.state.open,
        });
    }

    handleUpdateInput(value) {
        this.setState({
        dataSource: [
            value,
            value + value,
            value + value + value,
        ],
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
                    
                    onLeftIconButtonTouchTap={this.handleLeftTouchTap}
                >
              
                <AutoComplete
                hintText="Search..."
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                underlineShow={false}
                style={{background: '#fff',padding: '5px', top: 20,right: 12, borderRadius: '2px', height: '30px'}}
                 />
              
                   <Badge
                        badgeContent={10}
                        secondary={true}
                        badgeStyle={{top: 12, right: 12}}
                        >
                    <IconButton
                    iconStyle={{color: '#fff'}}
                    iconClassName="material-icons"
                    tooltip="messages"
                    touch={true}
                        >
                   notifications
                    </IconButton>
                    </Badge>
                      <Badge
                        badgeContent=""
                        secondary={true}
                        badgeStyle={{top: 12, right: 12}}
                        >
                    <IconButton
                    iconStyle={{color: '#fff'}}
                    iconClassName="material-icons"
                    tooltip="Your profile"
                    href="/profile"
                    touch={true}
                    >
                    person
                    </IconButton>
                 </Badge>
                </AppBar>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    openSecondary={true}
                >
                    <a className="menu_link" href="/home"><MenuItem onTouchTap={this.handleClose}>Home</MenuItem></a>
                    <a className="menu_link" href="/register"><MenuItem onTouchTap={this.handleClose}>Register</MenuItem></a>
                    <a className="menu_link" href="/getstarted"><MenuItem onTouchTap={this.handleClose}>Get Started</MenuItem></a>
                    <a className="menu_link" href="/conversation"><MenuItem onTouchTap={this.handleClose}>Conversations</MenuItem></a>
                    <a className="menu_link" href="/profile"><MenuItem onTouchTap={this.handleClose}>Profile</MenuItem></a>
                    <a className="menu_link" href="/contacts"><MenuItem onTouchTap={this.handleClose}>Contacts</MenuItem></a>
                </Drawer>
            </header>
        );
    }
}

export default Header;