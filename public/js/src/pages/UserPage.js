import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../components/styles';
import UserData from '../components/UserData';


class UserPage extends React.Component{
    constructor(props, context){
        super(props, context);

    }

    componentDidMount(){
        document.title="Profile";
    }

    render(){
        return (
            
                        <div style={styles.container}>
                            <Header />
                            <div  >
                             <UserData />
                            </div>
                           
                            <Footer />
                        </div>
        );
    }
}

module.exports = UserPage;