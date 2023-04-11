import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import classes from './noticeboard.module.css'
import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function NoticeBoard() {

    let container = null;
    container= (

       
      <Grid className={classes.style}>
        <Grid style={{width: '100%'}} className={classes.paddingStyle}>
        <Card sx={{ minWidth: 190, minHeight: 260, borderBlockStyle: 'solid' }} >
          <CardContent>
            <Typography align='center' sx={{ fontSize: 14 }}>
             <strong><h4>Other Professional Courses & Certificates</h4></strong>
            </Typography>
            <hr></hr>
            <Typography>

            </Typography>
             
          </CardContent>
        </Card>
      </Grid>

 
<Grid style={{width: '100%'}} className={classes.paddingStyle}>
<Card sx={{ minWidth: 190, minHeight: 260, borderBlockStyle: 'solid' }}>
<CardContent>
  <Typography align='center' sx={{ fontSize: 14 }}>
    <strong><h4>Research & Publications</h4></strong>
  </Typography>
  <hr></hr>
  <Typography>
    
  </Typography>
   
</CardContent>
</Card>
</Grid>
</Grid>
 

    )

    return (
        <div>
            { container }
        </div>
    )
}
