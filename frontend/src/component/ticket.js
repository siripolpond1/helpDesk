import React,{useState,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Axios from 'axios';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Chip from '@mui/material/Chip';
import TableSortLabel from '@mui/material/TableSortLabel';
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffdd72'
    },
    secondary:{
      main: '#808080'
    },
    blue:{
      main: '#87CEEB'
    }
}});



export default function Ticket() {
    const [ticket, setTicket] = useState([]);
    const [status,setStatus] = useState("ASC")
    const [lastupdate,setLastupdate] = useState("ASC")
    
    const sortingstatus =() =>{
      if (status === "ASC"){
        setTicket(
          ticket.sort((a,b)=>{
            return b.status - a.status
          })
        )
        setStatus("DESC")
      } 
      if (status === "DESC"){
        setTicket(
          ticket.sort((a,b)=>{
            return a.status - b.status
          })
        )
        setStatus("ASC")
    }
  }
  const sortinglast =() =>{
    if (lastupdate === "ASC"){
      setTicket(
        ticket.sort((a,b)=>{
          return new Date(b.updateat) - new Date(a.updateat) 
        })
      )
      setLastupdate("DESC")
    } 
    if (lastupdate === "DESC"){
      setTicket(
        ticket.sort((a,b)=>{
          return new Date(a.updateat) - new Date(b.updateat) 
        })
      )
      setLastupdate("ASC")
  }
}
    useEffect(() => {
      Axios.get('http://localhost:5000/ticket')
      .then(res => {
        setTicket(res.data);
      })
    },[]);

  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{p:2}}>
        <Paper>
        <Box sx={{ display:'flex', p:1 }}>
            <Box sx={{ flexGrow: 1}}>
              <Typography variant='h6' gutterBottom component="div">
                Ticket
              </Typography>
            </Box>
            <Box> <Button color="secondary" href ="/ticket/0" variant="contained">Pending</Button></Box>
            <Box> <Button color="primary" href ="/ticket/1" variant="contained">Resolved</Button></Box>
            <Box> <Button color="error" href ="/ticket/2" variant="contained">Rejected</Button></Box>
            <Box> <Button color="success" href ="/ticket/3" variant="contained">Accept</Button></Box>
            <Box> <Button href ="/create" variant="contained">Create</Button></Box>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center" >Title</TableCell>
                    <TableCell align="center" >Description</TableCell>
                    <TableCell align="center">Contract</TableCell>
                    <TableCell align="center">information</TableCell>
                    <TableCell align="center">Crateat</TableCell>
                    <TableCell align="center" key = "lastupdate">
                      <TableSortLabel active={true} direction = {lastupdate.toLowerCase()} onClick={()=>sortinglast()}>
                        Lastupdate</TableSortLabel>
                        </TableCell>
                    <TableCell align="center" ><TableSortLabel active={true} direction = {status.toLowerCase()} onClick={()=>sortingstatus()}>
                      Status
                      </TableSortLabel></TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
            
                {ticket.map((val) => (
                    <TableRow
                    key={val.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">{val.id}</TableCell>
                    <TableCell component="th" scope="row">{val.title}</TableCell>
                    <TableCell align="center">{val.description}</TableCell>
                    <TableCell align="center">{val.contract}</TableCell>
                    <TableCell align="center">{val.information}</TableCell>
                    <TableCell align="center">{val.createat.replace('T', ' ').replace('.000Z', ' ')}</TableCell>
                    <TableCell align="center">{val.updateat.replace('T', ' ').replace('.000Z', ' ')}</TableCell>
                    <TableCell align="center"> {(() => {
                      switch (val.status) {
                        case 0:
                          return <Chip label="Pending" color="secondary" />
                        case 1:
                          return <Chip label="Resolved" color="primary" />
                        case 2:
                          return <Chip label="Rejected" color="error" />
                        case 3:
                          return <Chip label="Accept" color="success" />
                        default:
                          return null
                      }
                    })()}</TableCell>
                       <TableCell align="center"><Button href ={"/edit/"+val.id} variant="contained" color="blue">
                          Edit
                        </Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
    </ThemeProvider>
  );
}