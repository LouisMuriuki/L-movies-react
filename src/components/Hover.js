import React from 'react'

function Hover(props) {
  return (
    <div >
           <h5>{props.data.original_title||props.data.original_name}</h5>
           <p> <span> &#9733; {props.data.vote_average}</span>           <span>{props.data.release_date||props.data.first_air_date}</span></p>
           <p id="hoverOverview">{props.data.overview}</p>   
           <p>Country:{props.data.origin_country||"unknown"}</p>
           <p>Language:{props.data.original_language||"unknown"}</p>  
    </div>
  )
}

export default Hover