import * as React from 'react';
import Chip from '@mui/material/Chip';
import classes from './dashboardbuttons.module.css'
import { Grid } from '@mui/material';

export default function ClickableChips(props) {

  const changeTab = (tabno) => {
    props.getData(tabno); 
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
      <div style={{display: 'block'}}>
            <Grid style={{}}>
            <Chip style={{width: '100%', marginTop: '8%', backgroundColor: 'rgb(52, 68, 85)', color: 'white'}} label="Pre-Registration" onClick={() => changeTab(5)} />
            </Grid>
            <Grid>
            <Chip style={{width: '100%', marginTop: '8%', backgroundColor: 'rgb(52, 68, 85)', color: 'white'}} label="Registration" onClick={handleClick} />
            </Grid>
            <Grid>
            <Chip style={{width: '100%', marginTop: '8%', backgroundColor: 'rgb(52, 68, 85)', color: 'white'}} label="Orientation" onClick={handleClick} />
            </Grid>
            <Grid>
            <Chip style={{width: '100%', marginTop: '8%', backgroundColor: 'rgb(52, 68, 85)', color: 'white'}} label="Semester Time Table" onClick={handleClick} /> 
            </Grid>
            <Grid>
            <Chip style={{width: '100%', marginTop: '8%', backgroundColor: 'rgb(52, 68, 85)', color: 'white'}} label="Payment" onClick={handleClick} /> 
            </Grid>   
      </div>
  );
}