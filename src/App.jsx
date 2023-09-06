import { useState } from 'react'
import {IconButton, Button} from '@mui/material'
import {QuestionMark, Search} from '@mui/icons-material'
import {HelpDialog} from './components/HelpDialog/Helpdialog.jsx'
import './App.css'

export const App = () => {
  const [isHelpClicked, setIsHelpClicked] = useState(false)

   const closeHelpDialog = () => setIsHelpClicked(false)
  return (
    <>
   <header>
    <h1>Weight Watcher</h1>
   <div> 
    <IconButton onClick={() => setIsHelpClicked(true)}><QuestionMark/></IconButton>
    <IconButton ><Search/></IconButton>
   </div>
   </header>
    <HelpDialog  isHelpClicked = {isHelpClicked} closeHelpDialog = {closeHelpDialog} />
    <Button variant='contained' color='success' className='search_button'>search</Button>
   </>
  )
}


