import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Prediction from './Prediction';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container >
          <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Magic 8 Ball</Navbar.Brand>
          </Navbar>
          <br></br>
          <br></br>
          <Prediction></Prediction>
        </Container>
      </div>
    );
  }
}