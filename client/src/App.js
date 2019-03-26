import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateArticle from "./components/create-article.component";
import EditArticle from "./components/edit-article.component";
import ArticleList from "./components/article-list.component";


class App extends Component {
  render() {
    return (
      <Router>
      
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand"></Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Articles</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Article</Link>
                </li>
              </ul>
            </div>
          </nav>

        </div>

   
      <Route path="/" exact component={ArticleList} />
      <Route path="/edit/:id" component={EditArticle} />
      <Route path="/create" component={CreateArticle} />
      </Router>

    );
  }
}

export default App;
