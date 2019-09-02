import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DashboardLayout from './Dashboard/DashboardLayout'

import HomeAPI from '../callapi/Home';

class Home extends Component {
  constructor(){
    super();
    this.state ={
      info : 'API',
      post : 'Not yet'
    };
   }
   componentWillMount() {
    HomeAPI.getInfoAPI().then((res)=>{
      this.setState({
        info : res.info
      })
    });
    HomeAPI.postAPI('Quynh').then((res)=>{
      this.setState({
        post : res.status
      })
    });
   }

  render() {
    return (
      <DashboardLayout>
        <p>Hello World of React and Webpack! Class</p>
        {this.state.info}
        {this.state.post}
        <p>
          <Link to="/dynamic">Navigate to Dynamic Page</Link>
        </p>
        <p>
          <Link to="/home">Navigate to Homepage</Link>
        </p>
      </DashboardLayout>
    );
  };
}

export default Home;