import React from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';
import PostForm from './PostForm';
import Posts from './Posts'
import { Segment } from 'semantic-ui-react';

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
        return <BlogForm {...this.state.blog} submit={this.submit} />
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


    render() {
        const { edit } = this.state
        return (
            <div style={{textAlign: 'center'}}>
            <Segment style={{margin: '15px'}}>
                {edit ? this.edit() : this.showBlog()}
                <button onClick={this.toggleEdit}>{ edit? 'Cancel' : 'Edit Title'}</button>
            </Segment>
            <Segment>
                <Posts {...this.props}/>
            </Segment>
            </div>
        )
    }

}

export default Blog;