
import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import GetBooks from './Componemts/Data';
import { Button } from '@mui/material';
import {Stack} from '@mui/material';
import Readinglist from './Componemts/Readinglist';
import './App.css'

function App() {
const [searchQuery,setSearchQuery] = React.useState('');
const [showAddList,setShowAddList] = useState(false);


const handleShowAddList = () => {
  setShowAddList(!showAddList);
}
  return (
    <main>
          <h1 className='turquiose'>Ello <span className='yellowtext'>Test</span></h1>
          {showAddList ? <Readinglist /> : (
            <>
              <Stack direction='row' justifyContent="space-between" padding={2}>
                <TextField  className='search' variant='outlined' fullwidth="true" label='search' onChange={ (e) => setSearchQuery(e.target.value) }  />
                  <Button variant='contained' onClick={handleShowAddList} className="Button" sx={{backgroundColor:'#28B8B8'}}>Show Addlist</Button>
              </Stack>
              <GetBooks search={searchQuery}  />
            </>)}
    </main>
  )
}

export default App
