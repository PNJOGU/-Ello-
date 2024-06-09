import React,{useEffect, useState} from 'react';
import { Button } from '@mui/material';
function Readinglist() {
  const [items,setItems] = useState([]);

  useEffect( () =>{
    const newbooks = JSON.parse(localStorage.getItem('books'));
    if(newbooks){
      setItems(newbooks);
    }
  },[]);


  const handleRemoveLocalItem = (list) => {
    let localItems = JSON.parse(localStorage.getItem('books'));
    //console.log(localItems)
    const index = localItems.findIndex((obj)=>{
      if (obj?.author === list?.author){
        return true
      }
      return false;
    });
    if (index !== -1){
      localItems.splice(index,1)
    
      localStorage.setItem("books",JSON.stringify(localItems))
    }
  }

  if (!items) return null;
  return (
    <ul className='selectedList'>
          {items && items.map( (list,index) => (
            <li key={index}>
                <h2>{list?.title}</h2>
                 <p>{list?.author}</p>
                 <Button variant='contained' sx={{backgroundColor:'#28B8B8'}} className='addlistBtn' onClick={() => handleRemoveLocalItem(list)}>Remove</Button>
            </li>
          ))}
    </ul>
  )
}

export default Readinglist