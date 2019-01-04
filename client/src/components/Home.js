import React, { Component } from 'react';
import { Header, Button, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render () {
        return (
            <div>
                <Header 
                as="h1" 
                style={{textAlign: 'center'}}>
                Welcome to Your Blogs
                </Header>
                <Segment 
                style={{textAlign: 'center'}}>
                <Button
                size="large">
                <Link to="/blogs">
                View Blogs
                </Link>
                </Button>
                </Segment>
            </div>
        )
    }
    
};

export default Home; 