import { useQuery, gql } from '@apollo/client';
import React,{useEffect, useState} from 'react';
import { Button } from '@mui/material';


const GET_BOOKS = gql`

  query Books {
  books{
    author
    coverPhotoURL
    readingLevel
    title
  }
  }
`;

export default function GetBooks ({search}) {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [books,setBooks] = useState([]);
  const [checklist,setChecklist] = useState(()=> {
    const data = JSON.parse(localStorage.getItem('books'));
    return data || [];
  });

  useEffect( () => {
    if(data){
      setBooks(data.books)
    }
  },[data]);

  useEffect( () => {
    localStorage.setItem('books',JSON.stringify(checklist))
  },[checklist]);

 

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const handleCheckList = (items) => {
    setChecklist((prev)=>[...prev,items]);
  }
  
 const DeleteItem = (item) => {
    const newarr = checklist.filter((book) => {
        return book !== item
      })

      setChecklist(newarr)
 }
  return (
    <section >
        {checklist.length === 0 ? <span></span> : ( <aside className='aside'>
        <h1>Reading list</h1>
        <ul className='selectedList'>
          {checklist && checklist.map( (list,index) => (
            <li key={index}>
                <h2>{list?.title}</h2>
                 <p>{list?.author}</p>
                 <Button variant='contained' onClick={ ()=>DeleteItem(list)}  sx={{backgroundColor:'#28B8B8'}} >Delete Item</Button>
            </li>
          ))}
       </ul>
        </aside>)}
       <section className='booksSection'>
            {books && books.filter((book) => search === '' ? book : book.title.trim().toLowerCase().includes(search.trim().toLowerCase())).map((book,index) => (
                  <div key={index} className='listItem'>
                      <h2>{book.title}</h2>
                      <p> {book.author}</p>
                      <Button variant='contained' className='addlistBtn' onClick={()=>handleCheckList(book)} sx={{backgroundColor:'#28B8B8'}}>Add to List</Button>
                  </div>   
            ))}
       </section>
       
       
    </section>
   
  )
/*return data.books.filter((book) => search === '' ? book : book.title.trim().tolowerCase().includes(search.trim().tolowerCase())).map(({author,coverPhotoURL,readingLevel,title},index) => (
          <div key={index}>
              <h2>{title}</h2>
              <img width="400" height="250" alt="book" src={`${coverPhotoURL}`} />
              <b>{readingLevel}</b>
              <p>{author}</p>
          </div>   
  ))*/
}

