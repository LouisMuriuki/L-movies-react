import React from 'react'
import './SearchBar.css'
import {Link} from 'react-router-dom'

export default function Searchbar({placeholder}) {
  const[apidata,setApiData]=React.useState([])
  const[filteredData,setFilteredData]=React.useState([])
  const[searchword,setSearchWord]=React.useState("")

  const onChangeHandler = event => {
      const word=event.target.value
    setSearchWord(word);
    const newFilter=apidata.filter((value)=>{
        return (value.original_title|| value.original_name).toLowerCase().includes(word.toLowerCase()) 
    })
    if(word===""){
        setFilteredData([])
    }else{
        setFilteredData(newFilter)
    }
    
  }
  React.useEffect(()=>{ 
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=1d1f5b1737638d866a6fb0d69e5a1f28&query=${searchword}`)
      .then(data=>{
         return data.json()
      }).then(movies=>{ 
          setApiData(movies.results)
      })
      .catch((err) => {
          console.log(err.message);
        })
  })
  return (
    <div className="search">
        <div className='searchInputs'>
        <input type="text" placeholder={placeholder} onChange={onChangeHandler}/>  
        </div>
        <div className="dataResult">
            {filteredData.slice(0,15).map((searchvalue,key)=>{
                return(
                    <div id="dataitem"> 
                    <Link to={"/Video/"+searchvalue.id } state={{
                        id: searchvalue.id,
                        title: searchvalue.original_title || searchvalue.original_name,
                        releasedate: searchvalue.release_date || searchvalue.first_air_date,
                        poster: searchvalue.poster_path,
                        ratings: searchvalue.vote_average,
                        language: searchvalue.original_language,
                        country: searchvalue.origin_country,
                        overview: searchvalue.overview
                    }}>
                    <p>{searchvalue.original_title|| searchvalue.original_name}</p></Link>
                    </div>
                )
            })}
        </div>
    </div>
  )
}


 