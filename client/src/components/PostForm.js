import React from 'react';

class PostForm extends React.Component {
    defaultValues = { name: '', description: '', body: '', date: ''}
    state = { name: '', description: '', body: '', date: ''};

    componentDidMount() {
        if (this.props.id) {
            this.setState({...this.props})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const blog = { ...this.state }
        this.props.submit(blog)
        this.setState({...this.defaultValues})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value, });
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <input 
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            />
            <input 
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
            />
            <input 
            name="body"
            placeholder="Type Post Here!"
            value={this.state.body}
            onChange={this.handleChange}
            />
            <input 
            name="date"
            placeholder="Date"
            value={this.state.date}
            onChange={this.handleChange}
            />
            <button>Submit</button>
        </form>
        )
    }
}

export default PostForm;