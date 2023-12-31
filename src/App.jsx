import { useState } from 'react'
import {IconButton, TextField, CssBaseline, Alert} from '@mui/material'
import {QuestionMark, Search} from '@mui/icons-material'
import {HelpDialog} from './components/HelpDialog/Helpdialog.jsx'
import {CountryDiv} from './components/CountryDiv/CountryDiv.jsx'
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
   /**
    * this function removes data based on its relationship with the id using the filter()
    * @param {number} id - is used to filter out anything that equals the id 
    * @returns 
    */
  const deleteDiv = (id) => setSearchedWeatherData(oldArray=> oldArray.filter(countryData=> countryData.id !== id))
  /**
   * function takes the data from the form then uses it to make a fetch request that if succesful
   * and is non repeating will be added to the {@link searchedWeatherData}
   */
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
      if(!response.ok){ // checks if fetch request is sucessful
        target.reset()
        throw new Error('location doesn\'t exist')
      }
     if(searchedWeatherData.some(countryData=>countryData.id === responseData.id)){
        alert('country is already in the data system!')
        target.reset()
        return
      }
     setSearchedWeatherData(oldArray => [...oldArray, responseData])
     target.reset()
     } catch (error) {
      alert(error)
     }
     
  }
  const countryWeatheList = searchedWeatherData.map((countryData,index) =>{
   return (
    <CountryDiv key={index} 
    name = {countryData.name} 
    temprature = {countryData.main.temp}
    description = {countryData.weather[0].description}
    country = {countryData.sys.country}
    deleteDiv={deleteDiv}
    id={countryData.id}
    />
    
    )
  })
  
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


