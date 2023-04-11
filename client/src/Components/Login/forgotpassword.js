import { Button , TextField, Paper } from '@mui/material';
import React, { useState } from 'react';


const ForgotPassword = () => {
    return(
        <Paper>
            <TextField 
                label='Email' 
                placeholder='Enter Email' 
                fullWidth variant = "outlined" 
            />
            <Button 
                type='submit' color='primary' 
                fullWidth variant="contained"> Submit
            </Button>
            <p style = {{color:'red',fontSize:'smaller'}}/>
        </Paper>    
    ) 
}

export default ForgotPassword;