import React from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import { Segment } from 'semantic-ui-react'

class Post extends React.Component { 
    state = { post: {}, edit: false, showForm: false}

    componentDidMount() {
        const url = this.props.match.url;
        axios.get(`/api/${url}`)
          .then(res => {
            this.setState({ post:res.data })
          })
      }

      toggleEdit = () => {
        this.setState(state => {
            return { edit: !this.state.edit }
        })
    }

    showPost = () => {
        const { post: { name, description, body, date } } = this.state
        return (
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <p>{body}</p>
                <p>{date}</p>
            </div>
        )
    }

    edit = () => {
        return <PostForm {...this.state.post} submit={this.submit} />
    }

    submit = (post) => {
        const url = this.props.match.url;
        axios.put(`/api${url}`)
        .then( res => {
            this.setState({ post: res.data, edit: false })
        })
    }

    render () {
        // const { edit } = this.state
        // return(
        //     <div>
        //             {/* { edit ? this.edit() : this.showPost } */}
        //     </div>
        const { post: { name, description, body } } = this.state
        return (
            <div style={{textAlign:'center'}}>
                <Segment>
                <h1>{name}</h1>
                <p>{description}</p>
                <p>{body}</p>
                </Segment>
                <Segment>
                    <h1>Edit Form Here</h1>
                <PostForm submit={this.submit}/>
                </Segment>
            </div>
        )
    }
}

export default Post;