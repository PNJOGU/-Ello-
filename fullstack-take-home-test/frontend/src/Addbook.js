import {gql,useMutation } from '@apollo/client';
import { TextField} from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';
import React from 'react';
const CREATE_BOOK = gql`
mutation AddBook($teacher:String!) {
addBook (teacher:$teacher) {
  author
  coverPhotoURL
  readingLevel
  title
}
}
`
function AddBook () {
  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK,{refetchQueries: [
    CREATE_BOOK, 
    'AddBook' 
  ],});
  const [name,setName] = useState('');
  const [author,setAuthor] = useState('');
  const [title,setTitle] = useState('');
  const [readingLevel,setReadingLevel] = useState('');
  const [coverPhotoURL,setCoverPhotoURL] = useState('');

  if (loading) return 'Submitting...';
  if (error) return `Encountered an error while submitting! ${error.message}`;

  const handleSubmit = async(e) => {
      e.preventDefault();
      createBook({variables:{teacher:name}})
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
                <TextField id='name' value={name} onChange={(e) => setName(e.target.value)} label="Name" variant="outlined" fullWidth
        margin="normal"/>
                <TextField onChange={(e) => setAuthor(e.target.value)} value={author} label="Author" variant="outlined" fullWidth
        margin="normal"/>
                <TextField onChange={(e) => setReadingLevel(e.target.value)} value={readingLevel} label="ReadingLevel" variant="outlined" fullWidth
        margin="normal"/>
                <TextField onChange={(e) => setTitle(e.target.value)} value={title} label="Title" variant="outlined" fullWidth
                margin="normal"/>
                <TextField onChange={(e) => setCoverPhotoURL(e.target.value)} value={coverPhotoURL} label="CoverPhotoURL" variant="outlined" fullWidth
        margin="normal"/>
              <Button variant="contained" color="primary"  type="submit">Submit</Button>
        </form>
    </div>
  )
}

export default AddBook