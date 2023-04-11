import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Chip, Grid, Stack } from '@mui/material';
import classes from './profilebutton.module.css';

export default function ProfileButton(props) {
  const changeTab = (tabno) => {
    console.log("clicked");
    props.getData(tabno);
   
  };
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    <Grid className={classes.style}> 
        <Grid className={classes.styling1} style={{ width: '100%'}}>
        <Grid style={{padding: '1% 0% 1% 2%', width: '100%'}}>
          <Chip className={classes.gcolor} style={{width: '100%', marginTop: '5%', backgroundColor: 'rgb(52, 68, 85)', color: 'black'}} label="View / Edit Profile" onClick={() => changeTab(1)} />
          </Grid>
          <Grid style={{padding: '1% 0% 1% 2%', width: '100%'}}>
          <Chip className={classes.gcolor} style={{width: '100%', marginTop: '5%', backgroundColor: 'rgb(52, 68, 85)', color: 'black'}} label="Faculty Feedback"  onClick={handleClick} />
          </Grid>
        </Grid>
          <Grid className={classes.styling1} style={{padding: '1% 1% 1% 0%', width: '100%'}}>
          <Grid style={{padding: '1% 0% 1% 2%', width: '100%'}}>
          <Chip className={classes.gcolor} style={{width: '100%', marginTop: '5%', backgroundColor: 'rgb(52, 68, 85)', color: 'black'}} label="Hostel Feedback" onClick={handleClick} />
          </Grid>
          <Grid style={{padding: '1% 0% 1% 2%', width: '100%'}}>
          <Chip className={classes.gcolor} style={{width: '100%', marginTop: '5%', backgroundColor: 'rgb(52, 68, 85)', color: 'black'}} label="View Forums & Clubs" onClick={handleClick} /> 
          </Grid>
          </Grid>
          
      </Grid>
  );
  }