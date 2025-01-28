// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Box, Input } from '@chakra-ui/react';


function App() {

  const [firstName, setfirstName] = useState("Kristin");
  const [lastName, setlastName] = useState("Richie");

  const onChangeFirstName = (event: any) => {
    // console.log('EVENT:', event.target.value)
    setfirstName(event.target.value);
  }

  const onChangeLastName = (event: any) => {
    // console.log('EVENT:', event.target.value)
    setlastName(event.target.value);
  }

  // const handleClick = async () => {
  //   const response = await axios.get('http://localhost:3001')
  //   console.log('RESPONSE', response);
  // }

  const handlePost = async () => {
    const response = await axios.post('http://localhost:3001/name', {
      firstName: firstName,
      lastName: lastName
    });
    console.log('POST RESPONSE:', response);
  }

  return (
    <>
      <Box m={10} display="flex" gap={2}>
        {/* <Button onClick={handleClick}>BUTTON</Button> */}
        <Input onChange={onChangeFirstName} placeholder='Type in a first name...'/>
        <Input onChange={onChangeLastName} placeholder='Type in a last name...'/>
        <Button onClick={handlePost}>Add Name</Button>

      </Box>
    </>
  )
}

export default App
