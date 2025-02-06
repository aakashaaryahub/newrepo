import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import NewLoan from './NewLoan'
import MyLoans from './MyLoans'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        {/* <Home /> */}
        <MyLoans/>
        
        <Routes>
          <Route path="/home" component={<Home />} />
          <Route path="/myloans" component={<MyLoans/>} />
          <Route path="/newloan" component={<NewLoan />} />
          {/* Add more routes as needed */}
          <Route path="/" exact component={<Home/>} /> {/* Default route */}
        </Routes>
      </div>
    </Router>

  )
}

export default App
