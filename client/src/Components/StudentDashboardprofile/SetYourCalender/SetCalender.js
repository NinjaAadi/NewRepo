import Button from '@mui/material/Button';
import { Box, Chip, Grid, Stack } from '@mui/material';
import classes from './setcalender.module.css';

export default function ProfileButton() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    
      <div className={classes.buttonAlign}>
          <Chip className={classes.buttonStyle} style={{width: '100%', marginTop: '8%', color: 'black'}} label="Set Your Calender" onClick={handleClick} /> 
      </div>
      
  );
}