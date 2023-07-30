import React,{useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Axios  from 'axios';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useParams } from 'react-router';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffdd72'

    }
}});


export default function Edit() {
  const {id} = useParams();

  useEffect(() =>{
    setEdit()
  }, []);
  const setEdit = () =>{
    Axios.get('http://localhost:5000/edit/'+id)
    .then(res => {
      if(res['status'] === 200){
        res.data.map((val)=> {
          setTitle(val.title)
          setContract(val.contract)
          setDescription(val.description)
          setInformation(val.information)
        })
      }
    })
  }
    const edit = event =>{ 
      Axios.put('http://localhost:5000/edit/'+id,{
        id : id,
        information : information
      }).then((result) => {
        if(result['status'] === 200){
          window.location.href = '/ticket'
          alert("Update Success")
        }
      });

    }
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contract, setContract] = useState('');
    const [information, setInformation] = useState('');
  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{p:2}}>
        <Box>
            <Typography variant='h6' gutterBottom component="div">
                Edit Ticket
              </Typography>
        </Box>
        <form onSubmit={edit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField id="title" label="title" variant="outlined" 
                fullWidth required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                InputProps={{
                  readOnly: true,
                }}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="description" label="description" variant="outlined" 
                fullWidth required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                InputProps={{
                  readOnly: true,
                }}/>
                </Grid>
                <Grid item xs={2}>
                <TextField id="contract" label="contract" variant="outlined"
                 fullWidth required
                 onChange={(e) => setContract(e.target.value)}
                 value={contract}
                 InputProps={{
                  readOnly: true,
                }}/>
                </Grid>
                <Grid item xs={10}>
                <TextField id="information" label="information" variant="outlined" 
                fullWidth required
                onChange={(e) => setInformation(e.target.value)}
                value={information}/>
                </Grid>
                <Grid item xs={12}>
                <Box> <Button type="submit" variant="contained" fullWidth>Edit</Button></Box>
                </Grid>
            </Grid>
        </form>
      </Container>
    </React.Fragment>
    </ThemeProvider>
  );
}