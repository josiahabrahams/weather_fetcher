import { useState } from 'react'
import {IconButton, Button, TextField, CssBaseline, Alert} from '@mui/material'
import {QuestionMark, Search} from '@mui/icons-material'
import {HelpDialog} from './components/HelpDialog/Helpdialog.jsx'
import './App.css'

export const App = () => {
  const [isHelpClicked, setIsHelpClicked] = useState(false) // used to render help dialog
  const [isSearchClicked, setIsSearchClicked] = useState(false) // used to render search form
  const [showWarning, setShowWarning] = useState(false) // used to render alert 
  const [searchedWeatherData, setSearchedWeatherData] =  useState([]) // stores seached countries
   const closeHelpDialog = () => setIsHelpClicked(false)
   const openHelpDialog = () => {
    setIsSearchClicked(false)
    setIsHelpClicked(true)
  }
   const openSearchInput = () => {
    setIsSearchClicked(true)
    setIsHelpClicked(false)
  }
  
  const handleSearchSubmit = async (event) => {
     event.preventDefault()
     const {target} = event
     const formData = new FormData(target)
     const data = Object.fromEntries(formData)
     const {location} = data
     if (location.trim() === '') { // if statment will show alert and return nothing or else it will remove the alert
      setShowWarning(true)
      
      return
     } else {
      setShowWarning(false)
     }
     try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bc74db2ba01ded79e2d775881726ae77`)
     const responseData = await response.json()
      
     setSearchedWeatherData(oldArray => [...oldArray, responseData])
     target.reset()
     } catch (error) {
      alert('country or city does not ')
     }
     
     
     
     

  }
  const countryWeatheList = searchedWeatherData.map((countryData,index) =>{
   return (
     <div key={index} className='country_holder'>
      <h2>{countryData.name}</h2>
      <div className='detail_div'>
        <p>Temprature: {Math.floor(countryData.main.temp - 273.15)}</p>
        <p>Weather: {countryData.weather[0].description}</p>
        <p>Country: {countryData.sys.country}</p>
      </div>
    </div>
    )
  })
  console.log(searchedWeatherData)
  return (
    <>
    <CssBaseline />
   <header>
    <h1>Weather Watcher</h1>
   <div> 
    <IconButton onClick={openHelpDialog}><QuestionMark/></IconButton>
    <IconButton onClick={openSearchInput}><Search/></IconButton>
   </div>
   </header>
  { isSearchClicked &&
   <div>
    <form style={{marginTop:'1rem'} } onSubmit={handleSearchSubmit}>
    <TextField id="outlined-basic" label="Country or City" variant="standard" name='location'/>
    <IconButton size='large' type='submit'><Search/></IconButton>
   </form>
   </div>
   }
   {showWarning && <Alert severity="error">please enter a value</Alert>}
    <HelpDialog  isHelpClicked = {isHelpClicked} closeHelpDialog = {closeHelpDialog} />
     <div>
      {countryWeatheList}
     </div>
   </>
  )
}


