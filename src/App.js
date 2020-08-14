import React from 'react';
import logo from './logo.svg';
import addMoreEventLogo from './addMoreEventLogo.svg';
import './App.css';
import { Formik } from 'formik';



class NewEvent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      startTime:{},
      finalTime:{},
      requiedTime:0,
      notes:'',
    };

  }
  
  render(){
    return (<div className="NewEvent">
      <form >
        <label className="eventTitle">
          事件标题：
          <input type="text" value={this.state.title}></input>
        </label>
        <label className="timeHorizon">
          设置时间范围：
          <label>
            开始时间：
            <input type="data" className="startTime"></input>
          </label>
          <label>
            终止时间：
            <input type="data" className="finalTime"></input>
          </label>
        </label>
        <label className="eventNote">
          备注：
          <textarea></textarea>
        </label>
      </form>

    </div>);
  }
}

class AddMoreEvent extends React.Component{
  render(){
    return (<div className="AddMoreEvent">
      <img src={addMoreEventLogo} className="AddMoreEvent-logo" alt="点此添加事件" title="添加事件"/>
    </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AddMoreEvent/>
      </header>
    </div>
  );
}

export default App;
