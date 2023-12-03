import axios from 'axios';
import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

class App extends Component {
  state = {
    isLoadingVisible: false,
    val: '',
    imgSrc: '',
  };

  showLoading = () => {
    this.setState({ isLoadingVisible: true });
  };

  hideLoading = () => {
    this.setState({ isLoadingVisible: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.showLoading();

    console.log(prompt);
    console.log(process.env.NODE_ENV);

    const api =
      process.env.NODE_ENV === 'development'
        ? '/test/stabled'
        : 'https://qm2x97ii2c.execute-api.us-east-2.amazonaws.com/test/stabled';
    const data = { data: e.target.searchQuery.value };
    console.log(data);
    axios({
      method: 'POST',
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      url: api,
    })
      .then((response) => {
        console.log(response);
        this.setState({ imgSrc: response.data.body });

        setTimeout(() => {
          this.hideLoading();
          this.setState({ val: '' });
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Container className='p-5' id='container' name='container'>
        <h1><center> Stable Diffusion Text-to-Image Generation on AWS </center></h1>
        <h3><center> Columbia ELENE6770: Final Project  </center></h3>
        <h4><center> Zhenguo Wu (zw2542) and Chuan-Tung Lin (cl4030)</center></h4>
        <h4><center> Professor: Thomas Woo</center></h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='mb-3' controlid='formBasicEmail'>
            <Form.Label>Enter text prompt to be converted to image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter text here to be converted to image'
              required
              autoFocus={true}
              name='searchQuery'
              controlid='searchQuery'
              defaultValue={this.state.val}
            />
            <Form.Text className='text-muted'>
              We are committed to producing the best images. The loading process is anticipated to take around 15 seconds.
            </Form.Text>
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className='btn btn-primary btn-large centerButton'
          >
            Submit
          </Button>

          <Image
            id='myImage'
            className='img-fluid shadow-4'
            src={this.state.imgSrc}
          />
        </Form>
        {this.state.isLoadingVisible && (
          <div id='backdrop'>
            <Button variant='primary' disabled>
              <Spinner
                target='container'
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              Loading...
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Welcome to Stable Diffusion AI App
//         </p>
//       </header>
//     </div>
//   );
// }

// export default App;
