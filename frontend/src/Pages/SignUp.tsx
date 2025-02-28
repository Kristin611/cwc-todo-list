import { Box, Button, Heading, Input, Text, Field } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react"

//can move this to helper functions file & it is not inside the component bc want to avoid re-loading it over and over; useMemo hook as alternative
const isInvalidEmail = (email: string) => {
    const emailFormat = /\S+@\S+\.\S+/;
    if (email.match(emailFormat) && email.length > 0) {
        return false;
    } else {
        return true;
    }
}

const passwordMismatch = (pass1: string, pass2: string) => { //pass1 === password and pass2 ===confirmPassword
    if (pass2 !== pass1) {
        return true;
    } else {
        return false;
    }
}

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isClickedName, setIsClickedName] = useState(false);
    const [isClickedEmail, setIsClickedEmail] = useState(false);
    const [isClickedUsername, setIsClickedUsername] = useState(false);
    const [isClickedPassword, setIsClickedPassword] = useState(false);
    const [isClickedConfirmedPassword, setIsClickedConfirmedPassword] = useState(false);

    const isErrorName = isClickedName && name === '';
    const isErrorEmail = isClickedEmail && isInvalidEmail(email);
    const isErrorUsername = isClickedUsername && username === '';
    const isErrorPassword = isClickedPassword && password === '';
    const isErrorConfirmedPassword = isClickedConfirmedPassword && passwordMismatch(password, confirmPassword)

    const handleNameChange = (e: any) => {
        // console.log(e.target.value);
        setIsClickedName(false);
        setName(e.target.value);
    }

    const handleEmailChange = (e: any) => {
        // console.log(e.target.value);
        setIsClickedEmail(false);
        setEmail(e.target.value);
    }

    const handleUsernameChange = (e: any) => {
        // console.log(e.target.value);
        setIsClickedUsername(false);
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: any) => {
        // console.log(e.target.value);
        setIsClickedPassword(false);
        setPassword(e.target.value);
    }

    const handlePasswordConfirmation = (e: any) => {
        // console.log(e.target.value);
        setIsClickedConfirmedPassword(false);
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async () => {
        // console.log('Name:', name);
        // console.log('Email:', email);
        // console.log('Username:', username);
        // console.log('Password:', password)
        // console.log('second password', confirmPassword)

        setIsClickedName(true);
        setIsClickedEmail(true);
        setIsClickedUsername(true);
        setIsClickedPassword(true);
        setIsClickedConfirmedPassword(true);


        if (
            name === '' || 
            isInvalidEmail(email) || 
            username === '' || 
            password === '' || 
            confirmPassword !== password || 
            confirmPassword === '' 
        ) {
            // console.log('ERRORRRRRS');
            // console.log('Error confirmed password', isErrorConfirmedPassword)
            return; //do not submit if any fields are in error state
        } else {
            try {
            const response = await axios.post('http://localhost:3001/auth/sign-up', {
                name,
                email,
                username,
                password,
                confirmPassword,
            });
            console.log('RESPONSE:', response)
            setName(''); //clear input fields
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');

            // setIsClickedName(false);
            // setIsClickedEmail(false);
            // setIsClickedUsername(false);
            // setIsClickedPassword(false);

            } 
            catch (error) {
                console.log('error:', error)
            }
        };


        
    }

  return (
    <Box>
        <Heading textAlign="center" mb={4}>Create an Account</Heading>
        <Box maxW="75%" display='flex' flexDirection='column' alignItems='center' m="0 auto" gap={4}>
            <Field.Root invalid={isErrorName} required>
                <Field.Label>
                    Name
                <Field.RequiredIndicator/>  
                </Field.Label>
                <Input type='text' onChange={handleNameChange} value={name ? name : ''} />
                {!isErrorName ? (
                    <Field.HelperText>Enter your name.</Field.HelperText>
                    //null if you dont want helper text
                ) : (
                    <Field.ErrorText>A name is required.</Field.ErrorText>
                )}   
            </Field.Root>

            <Field.Root invalid={isErrorEmail} required>
                <Field.Label>
                    Email
                <Field.RequiredIndicator/>  
                </Field.Label>
                <Input type='email' onChange={handleEmailChange} value={email ? email : ''} />
                {!isErrorEmail ? (
                    <Field.HelperText>Enter your email address.</Field.HelperText>
                    //null if you dont want helper text
                ) : (
                    <Field.ErrorText>A valid email is required.</Field.ErrorText>
                )}      
            </Field.Root>

            <Field.Root invalid={isErrorUsername} required>
                <Field.Label>
                    Username
                <Field.RequiredIndicator/>  
                </Field.Label>
                <Input type='text' onChange={handleUsernameChange} value={username ? username : ''} />
                {!isErrorUsername ? (
                    <Field.HelperText>Enter your username.</Field.HelperText>
                    //null if you dont want helper text
                ) : (
                    <Field.ErrorText>A username is required.</Field.ErrorText>
                )}      
            </Field.Root>

            <Field.Root invalid={isErrorPassword} required>
                <Field.Label>
                    Password
                <Field.RequiredIndicator/>  
                </Field.Label>
                <Input type='password' onChange={handlePasswordChange} value={password ? password : ''} />
                {!isErrorPassword ? (
                    <Field.HelperText>Enter your password.</Field.HelperText>
                    //null if you dont want helper text
                ) : (
                    <Field.ErrorText>A password is required.</Field.ErrorText>
                )}      
            </Field.Root>

            <Field.Root invalid={isErrorConfirmedPassword} required>
                <Field.Label>
                    Re-Enter Password
                <Field.RequiredIndicator/>  
                </Field.Label>
                <Input type='password' onChange={handlePasswordConfirmation} value={confirmPassword} />
                {!isErrorConfirmedPassword ? (
                    <Field.HelperText>Re-Enter your password.</Field.HelperText>
                    //null if you dont want helper text
                ) : (
                    <Field.ErrorText>Passwords must match.</Field.ErrorText>
                )}      
            </Field.Root>
            <Button w='100%' onClick={handleSubmit} >Submit</Button>
        </Box>   
    </Box>
  )
}

export default SignUp