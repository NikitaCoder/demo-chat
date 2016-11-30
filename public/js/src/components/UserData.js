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
import UserActions from '../api/actions/UserActions';
import UserStore from '../api/stores/UserStore';


class UserData extends React.Component{
    constructor(props){
        super(props);

        this.state = 
        {
            avatar: '',
            file: '',
            imgUrl: false,
        };

        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSaveImage = this._handleSaveImage.bind(this);
        this._onRegiser = this._onRegiser.bind(this);
    }

    componentDidMount(){
        UserStore.addChangeListener(this._onRegiser);
        document.title="Profile";
        
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegiser);
    }

     _onRegiser(){
        this.setState({
            file: '',
            imgUrl: false,
        });
    }

    _handleSaveImage(e){
        if(this.state.file){
            var data = new FormData()
            data.append('file', this.state.file);
            UserActions.saveAvatar(data);
        }
    }

    _handleImageChange(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = (data) =>{
            this.setState({
                imgUrl: reader.result,
                file: file,
            });
        };
        reader.readAsDataURL(file);
       
    }

    render(){
        var registeredDate = new Date(this.props.user.register_date);
        var year = registeredDate.getFullYear();
        var month = registeredDate.getMonth() + 1;
        var day = registeredDate.getDate();
        return(
            <div>
                <div style={styles.userData}>
                     <Card >
                        <CardTitle title="Your Profile" subtitle={this.props.user.nickName}  />
                        <CardText style={styles.ContainerCard} expandable={false}>
                         <Card>
                         <CardText style={styles.userCard}  expandable={false}>
                                <Avatar src={this.props.user.avatar ? "/uploads/avatars/" + this.props.user.avatar : "/logo/no-avatar.png" } size={150} /><br />

                                <RaisedButton 
                                    style={styles.button}
                                    label="Upload image" 
                                    labelPosition="before" 
                                    containerElement="label" 
                                    primary={true}>
                                     <input type="file" name="avatar"  onChange={this._handleImageChange} style={styles.exampleImageInput} />
                                </RaisedButton><br />
                                {this.state.imgUrl ?
                                    <div>
                                    <Avatar src={this.state.imgUrl ? this.state.imgUrl : "/logo/no-avatar.png"} size={150} /><br />
                                    <RaisedButton label="save" onTouchTap={this._handleSaveImage} primary={true} />
                                    </div>
                                : ""
                                 }
                               

                                <div>First Name: {this.props.user.firstName}</div>
                                <div>Last Name:{this.props.user.lastName}</div>
                                <div>Registered Date:  {day + "." + month + " " + year}  </div>
                        </CardText>
                        </Card>

                                <List >
                                <Subheader style={ {fontSize: '20px', color: lime800} }>Your Conversations:</Subheader>
                                 <ListItem
                                    primaryText="Brendan Lim"
                                    rightIcon={<CommunicationChatBubble />}
                                />
                                <ListItem
                                    primaryText="Eric Hoffman"
                                    rightIcon={<CommunicationChatBubble />}
                                />
                                <ListItem
                                    primaryText="Grace Ng"
                                    rightIcon={<CommunicationChatBubble />}
                                />
                                <ListItem
                                    primaryText="Kerem Suer"
                                    rightIcon={<CommunicationChatBubble />}
                                />
                                <ListItem
                                    primaryText="Raquel Parrado"
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