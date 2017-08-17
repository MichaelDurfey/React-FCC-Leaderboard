import React from 'react';
import './App.css';
import axios from 'axios';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light fixed-top bg-faded">
        <a className="navbar-brand" href="https://www.freecodecamp.org/">
          <img src="https://www.freecodecamp.com/design-style-guide/img/freeCodeCamp.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
        </a>
  </nav>
  );
}

  class BoardLegend extends React.Component {
    render(){
    return (
    <li className ="list-group-item legend">
          <div className ="rank">
            #
          </div>
          <div className ="border">
          </div>
          <div className ="media-left">
            <img className="align-self-center media-object" src ="http://www.freeiconspng.com/uploads/profile-icon-9.png" alt="username" />
          </div>
        <div className ="border">
          </div>
          <div className ="userName col">
            User Name
          </div>
        <div className ="border">
          </div>
          <div className ="recentPoints col text-center">
            <a href="#!" onClick ={() => this.props.getRecent()}> Points in past 30 days</a>
          </div>
        <div className ="border">
          </div>
        <div className ="allTimePoints col text-center">
              <a href="#!" onClick ={() => this.props.getAllTime()}> All time points</a>
          </div>
        </li>
      )
    }
  }
  
  
    
  const BoardList = (props) => {
    console.log(props)
     const obj = props.value.map( (item, index) => {
      return (   
        <BoardListItem
          image={item.img}
          username={item.username}
          recent={item.recent}
          alltime={item.alltime}
          index={index}
        />     
      )
    })     
     return (
      <ul className ="col-sm-12 list-group">
         {obj}
      </ul>    
     );
  };
  
  const BoardListItem = ({image, username, recent, alltime, index}) => {   
    return (
        <li className ="list-group-item">
          <div className ="rank">
            {index + 1}
          </div>
          <div className ="border">
          </div>
          <div className ="media-left">
            <img className="align-self-center media-object" src ={image} alt="username"/>
          </div>
        <div className ="border">
          </div>
          <div className ="userName col">
            <a href={`https://www.freecodecamp.com/${username}`}>{username}</a>
          </div>
        <div className ="border">
          </div>
          <div className ="Points col text-center">
              {recent}
          </div>
        <div className ="border">
          </div>
        <div className ="Points col text-center">
              {alltime}
          </div>
        </li>
    )
  }

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: [],
    }
    this.recent()
  }

    recent(){
      return axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/recent`)
      .then(res => this.setState({ 
        value: res.data
      }))
    }
    
    allTime(){
      return axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/alltime`)
      .then(res => this.setState({ 
        value: res.data
      }))
    }
  
  render(){
    console.log(this.state.recent)
    return (
      <div>
        <Navbar />
        <div className ="container justify-content-center">
          <nav className ="navbar leaderboardNav">
            Leaderboard
          </nav>
        <BoardLegend 
          getAllTime={() => this.allTime()}
          getRecent={() => this.recent()}
          />
        <BoardList 
          value={this.state.value}
          />
        </div>
      </div>
    );
  }
} // End Class App

export default App
