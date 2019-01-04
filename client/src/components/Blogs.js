import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header, Segment, Button, Icon, Card, Grid } from 'semantic-ui-react';
import BlogForm from './BlogForm';

class Blogs extends React.Component {
    state = {
        blogs: []
    }

    componentDidMount() {
        axios.get('/api/blogs')
        .then( res => {
            this.setState({ blogs: res.data })
        })
    }

    form = () => {
        return <BlogForm submit={this.submit} />
    }

    submit = (blog) => {
        axios.post('/api/blogs', { blog })
        .then( res => {
            this.setState({blogs: [res.data, ...this.state.blogs]})
        })
    }

    deleteBlog = (id) => {
        axios.delete(`/api/blogs/${id}`)
        .then ( res => {
            const { blogs } = this.state
            this.setState({ blogs: blogs.filter( t => t.id !== id) })
        })
    }

    renderBlogs = () => {
        return this.state.blogs.map( p => {
            return (
                
                <Grid.Column>
                <Card key={p.id}>
                <Card.Content>
                    <Header as="h3">
                        <Link
                            to={`/blogs/${p.id}`}
                            >{p.title}</Link>
                    </Header>
                    <p>{p.category}</p>
                </Card.Content>
                <Card.Content>
                <Button
                    icon
                    color="red"
                    size="small"
                    onClick={() => this.deleteBlog(p.id)}
                    style={{marginLeft: "16px"}}
                >
                    <Icon name="trash" />
                </Button>
                </Card.Content>
                </Card>
                </Grid.Column>
               
            )
        })
    }

    render () {
        return (
            <div style={{margin: '15px'}}>
            <Segment style={{textAlign:'center'}}>
            <Header as="h1" >Blogs</Header>
            <Header as="h3" >Add Blog</Header>
            { this.form() }
            </Segment>
            <div>
            <Grid columns="four">
            { this.renderBlogs() }
            </Grid>
            </div>
            </div>
        )
    }


}

export default Blogs;