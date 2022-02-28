import Searchbar from "./Searchbar"
import React from "react"
export default function Nav(){

    return(
        <nav>
         <h2>L-MOVIES</h2>
         <Searchbar 
         placeholder="Search Movie/TvShow" 
         name="name"
          
          />
        </nav>
    )
} 