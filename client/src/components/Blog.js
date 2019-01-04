import React from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';
import PostForm from './PostForm';
import { Header, Icon, Segment, Button } from 'semantic-ui-react';

class Blog extends React.Component {
    state = { blog: {}, posts: [], edit: false, showForm: false, }
    
    componentDidMount() {
        axios.get(`/api/blogs/${this.props.match.params.id}`)
        .then(res => {
            this.setState({ blog: res.data })
        });
        axios.get(`/api/blogs/${this.props.match.params.id}/posts`)
        .then(res => {
            this.setState({ posts: res.data })
        })
    }

    toggleEdit = () => {
        this.setState(state => {
            return { edit: !this.state.edit }
        })
    }

    showBlog = () => {
        const { blog: { title } } = this.state
        return (
            <div style={{padding: '5px'}}>
                <h1>{title}</h1>
            </div>
        )
    }

    edit = () => {
        return <BlogForm {...this.state.list} submit={this.submit} />
    }

    submit = (blog) => {
        axios.put(`/api/blogs/${this.props.match.params.id}`, { blog })
        .then(res => {
            this.setState({ blog: res.data, edit: false})
        })
    }

    toggleForm = () => {
        this.setState( state => {
            return { showForm: !state.showForm}
        })
    }

    form = () => {
        return <PostForm submit={this.submit} />
    }

    renderPosts = () => {
        return this.state.posts.map(p => {
            return (
                <Segment key={p.id}>
                <Header as="h2">{p.name}</Header>
                <Header as="h3">{p.description}</Header>
                <p>{p.body}</p>
                <p style={{color: 'grey'}}>{p.date}</p>
                <Button
                    icon
                    color="red"
                    size="small"
                    onClick={() => this.deletePost(p.id)}
                ><Icon name="trash" />
                </Button>
                </Segment>
            )
        })
    }

    render() {
        const { edit } = this.state
        return (
            <div style={{textAlign: 'center'}}>
            <Segment style={{margin: '15px'}}>
                {edit ? this.edit() : this.showBlog()}
                <button onClick={this.toggleEdit}>{ edit? 'Cancel' : 'Edit Title'}</button>
            </Segment>
            </div>
        )
    }

}

export default Blog;