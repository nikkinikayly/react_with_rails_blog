import React from 'react';

class BlogForm extends React.Component {
    defaultValues = { title: '', category: ''}
    state = { title: '', category: '' };

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
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
            />
            <input 
            name="category"
            placeholder="Category"
            value={this.state.category}
            onChange={this.handleChange}
            />
            <button>Submit</button>
        </form>
        )
    }
}

export default BlogForm;