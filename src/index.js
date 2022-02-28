import ReactDOM from "react-dom"
import App from "./App"
import "./style.css"
import { BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Video from "./components/Video"
import React from "react"
import Error from './components/Error'
ReactDOM.render(  
    <React.StrictMode>
     <Router>
    <Routes>
<Route path="/" element={<App />} />
<Route path="/L-movies-react" element={<App />} />
<Route path="/Video/:id" element={<Video/>} />
<Route path="*" element={<Error/>} />
</Routes>
</Router>
</React.StrictMode>,
 document.getElementById("root"))
