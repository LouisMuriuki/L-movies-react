import React from "react"
import { Carousel } from "react-bootstrap"
export default function ControlledCarousel() {

  const [index, setIndex] = React.useState(0);
  const [all, setAll] = React.useState([])
  const [windowSize, setWindowSize] = React.useState(null)
  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth)

    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  React.useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=1d1f5b1737638d866a6fb0d69e5a1f28')
      .then(data => {
        return data.json()
      }).then(movies => {
        setAll(movies.results)

      })
      .catch((err) => {
        console.log(err.message);
      })

  }, [])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {all.map(one => (
        <Carousel.Item>
          <div className="d-block">
          <img
             src={"https://image.tmdb.org/t/p/original/" + one.poster_path}
            alt={one.original_title}
          />
          </div>
          <Carousel.Caption id="caption">
            {
              windowSize > 768 &&
              <h1>{one.original_title || one.original_name}</h1>
            }
            <p id="overview">{one.overview}</p>
            <p><span>&#9733;{one.vote_average}</span><span>{one.release_date}</span><span>{one.media_type}</span></p>  
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}



