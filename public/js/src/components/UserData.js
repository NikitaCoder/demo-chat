import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../components/styles';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import {pinkA200,lime800, transparent} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class UserData extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                <div style={styles.userData}>
                     <Card >
                        <CardTitle title="Your Profile" subtitle={new Date().toString()} />
                        <CardText style={styles.ContainerCard} expandable={false}>
                         <Card>
                         <CardText style={styles.userCard}  expandable={false}>
                                <Avatar src="/logo/index.png" size={150} /><br />
                                <RaisedButton label="Upload image" primary={true} />
                                <div>First Name: Ilya</div>
                                <div>Last Name: Barbashov</div>
                                
                                <div> <RaisedButton label="Contacts List" primary={true} /> </div>
                                <div>Registered Date:  10 november 2017 year  </div>
                        </CardText>
                        </Card>

                                <List >
                                <Subheader style={ {fontSize: '20px', color: lime800} }>Recent chats</Subheader>
                                 <ListItem
                                    primaryText="Brendan Lim"
                                    leftAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                    rightIcon={<CommunicationChatBubble />}
                                />
                                <ListItem
                                    primaryText="Eric Hoffman"
                                    leftAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                    rightIcon={<CommunicationChatBubble />}
                                />
                                <ListItem
                                    primaryText="Grace Ng"
                                    leftAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                    rightIcon={<CommunicationChatBubble />}
                                />
                                <ListItem
                                    primaryText="Kerem Suer"
                                    leftAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                    rightIcon={<CommunicationChatBubble />}
                                />
                                <ListItem
                                    primaryText="Raquel Parrado"
                                    leftAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                    rightIcon={<CommunicationChatBubble />}
                                />
                            </List>
                            <Divider inset={true} />
                        </CardText>
                    </Card>  
                </div>  
            </div>
        );
    }
}

module.exports=UserData;