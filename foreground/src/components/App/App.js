import React from "react";
// containers
import Header from "../../containers/Header/Header"
// import MainArea from "./components/MainArea/MainArea"
import MainAreaContainer from "../../containers/MainAreaContainer/MainAreaContainer"
import Sidebar from "../../components/Sidebar/Sidebar"
import RightColumn from "../../containers/RightColumn/RightColumn"

require('./app.css')

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <MainAreaContainer />
        <Sidebar />
        <RightColumn />
      </div>
    );
  }
}

export default App;