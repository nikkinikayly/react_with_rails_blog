import React from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import { Header, Segment, Button, Icon } from 'semantic-ui-react';

class Posts extends React.Component {
    state = { posts: [], showForm: false, edit: false }

    componentDidMount() {
        axios.get(`/api/blogs/${this.props.match.params.id}/posts`)
        .then(res => {
            this.setState({ posts: res.data })
        })
    }

    toggleForm = () => {
        this.setState( state => {
            return { showForm: !state.showForm }
        })
    }

    toggleEdit = () => {
        this.setState( state => {
            return { edit: !state.edit }
        })
    }

    edit = () => {
        return <PostForm {...this.state.post} submit={this.submitPost} />
    }

    form = () => {
        return <PostForm submit={this.submit} />
    }

    submit = (post) => {
        axios.post(`/api/blogs/${this.props.match.params.id}/posts/`, {post} )
        .then( res => {
            this.setState({posts: [res.data, ...this.state.posts], showForm: false})
        })
    }

    submitPost = (post) => {
        axios.post(`/api/blogs/${this.props.match.params.id}/posts/`, {post} )
        .then( res => {
            this.setState({posts: [res.data, ...this.state.posts], edit: false})
        })
    }

    renderPosts = () => {
        return this.state.posts.map(p => {
            return (
                <Segment key={p.id} style={{textAlign: 'left'}}>
                <Header as="h2">{p.name}</Header>
                <Segment>
                <Header as="h3">{p.description}</Header>
                <p>{p.body}</p>
                <p style={{color: 'grey'}}>{p.date}</p>
                </Segment>
                <Button
                    icon 
                    color="blue"
                    size="small"
                    onClick={() => this.toggleEdit}
                >Edit</Button>
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

    deletePost = (id) => {
        axios.delete(`/api/blogs/${this.props.match.params.id}/posts/${id}`)
        .then ( res => {
            const { posts } = this.state
            this.setState({ posts: posts.filter( t => t.id !==id ) })
        })
    }

    render() {
        const { showForm, edit } = this.state
        return (
            <div>
                <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Add Post' }</button>
                {showForm ? this.form() : this.renderPosts()}
                {edit ? this.form() : this.renderPosts()}
            </div>
        )
    }

};

export default Posts;