import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../components/styles';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, lime800, transparent} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';


class ContactList extends React.Component{
    constructor(props, context){
        super(props, context);

    }

    componentDidMount(){
        document.title="Contacts";
        console.log(ActionGrade);
    }

    render(){
        return (
            
                        <div style={styles.container}>
                            <Header />
                            <div  style={styles.contacts}>
                            <Card  >
                                <CardTitle title="Contact List" titleColor={lime800} />
                                <CardText  expandable={false}>
                                    <List >
                                        <ListItem
                                            primaryText="Chelsea Otakan"
                                            leftIcon={<ActionGrade color={pinkA200} />}
                                            rightAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                        />
                                        <ListItem
                                            primaryText="Eric Hoffman"
                                            insetChildren={true}
                                            rightAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                        />
                                        <ListItem
                                            primaryText="James Anderson"
                                            insetChildren={true}
                                            rightAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                        />
                                        <ListItem
                                            primaryText="Kerem Suer"
                                            insetChildren={true}
                                            rightAvatar={<Avatar src="logo/GitHub-Mark-120px-plus.png" />}
                                        />
                                    </List>
                                    <Divider inset={true} />
                                </CardText>
                            </Card>
                            </div>
                           
                            <Footer />
                        </div>
        );
    }
}

module.exports = ContactList;