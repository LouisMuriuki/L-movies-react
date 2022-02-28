import React from "react"
import Nav from "./components/nav"
import Card from "./components/card"
import Slider from "./components/ControlledCarousel"



export default function App() {
    return (
        <div>
            <Nav />
            <Slider />
            <Card />
        </div>

    )
}