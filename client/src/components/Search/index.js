import React, { Component } from "react";
import { Input, FormBtn, SaveBtn } from "../Form";
import { Col, Row, Container } from "../Grid";
import Jumbotron from "../Jumbotron";
import { List, ListItem } from "../List";
import API from "../../utils/API";
import axios from "axios";
class Search extends Component {
  state = {
    search: "",
    items: []
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  apiSearch = event => {
    event.preventDefault();
    axios
      .get(`http://api.steamapis.com/market/items/489940?api_key=b1eQml-g5_-9vAshjf0X-anQHAQ`)
      .then(res => this.setState({items: res.data  }),
      console.log(this.state));
      
      
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let id = event.target.id;
    API.saveBook({
      title: this.state.items[id].data.market_name,
      price: this.state.items[id].data.prices.median,
      image: this.state.items[id].data.image,
    })
      .then(res => alert(`${res.data.title} has been saved to your book list.`))
      .catch(err => console.log(err));
    event.target.hidden = true;
  };

  render() {
    return (
      <div>
        <form>
          <Container fluid>
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
            </Jumbotron>
            <Input
              name="search"
              value={this.state.search}
              placeholder="Title (required)"
              onChange={this.handleInputChange}
            />
            <FormBtn disabled={!this.state.search} onClick={this.apiSearch}>
              Search Books
            </FormBtn>
            <Row>
              <Col size="md-6" />
              <Col size="md-12 md-12">
                {this.state.items.length ? (
                  <List>
                    {this.state.items.data.map((items, index) => {
                      return (
                        <ListItem key={items.nameID}>
                          <a>
                            <h3 name="title">
                          
                                {this.state.items.data.array.market_name}
                              
                            </h3>
                            {/* <h6>{book.volumeInfo.subtitle}</h6>
                            <h5 name="authors">
                              Written by {book.volumeInfo.authors[0]}
                            </h5> */}
                            <br />
                            <div className="card">
                              <div className="img-container">
                                <img
                                  name="link"
                                  value={this.state.items.image}
                                  alt={items.market_hash_name}
                                  src={items.image}
                                  name="image"
                                />
                              </div>
                            </div>
                            {/* <p name="description">
                              {book.volumeInfo.description}
                            </p> */}
                            <SaveBtn
                              id={index}
                              onClick={this.handleFormSubmit}
                              hidden={false}
                            >
                              Save This Book
                            </SaveBtn>
                          </a>
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    );
  }
}
export default Search;
