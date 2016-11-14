import React from 'react';
import { lime800,lime500,limeA400 } from 'material-ui/styles/colors';

class Footer extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <footer className="footer">
                <div>
                    Created by Ilya Barbashov: <br />
                    <a style={{color: limeA400}} href="https://github.com/Ilya225/demo-chat"> Demo Chat on GitHub </a> <br />
                    {new Date().getFullYear()}<br />
                </div>
            </footer>
        );
    }
}

export default Footer;