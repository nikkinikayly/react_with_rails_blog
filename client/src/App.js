import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Posts from './components/Posts';
// import Post from './components/Post';

const App = () => (
  <Fragment>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/blogs' component={Blogs} />
      <Route exact path='/blogs/:id' component={Blog} />
      <Route exact path='/blogs/:id/posts' component={Posts} />
      {/* <Route exact path='/blogs/:blog_id/posts/:id' component={Post} /> */}
      <Route component={NoMatch} />
    </Switch>
  </Fragment>
);



export default App;
