import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';

function TimelineCustom(props) {
    return(
        <div>
            <Timeline>
                            <TimelineItem>
                                <TimelineOppositeContent>
                                    <Typography color="textSecondary">{props.log_time}</Typography>
                                </TimelineOppositeContent>
                              <TimelineSeparator>
                                <TimelineDot > 
                                  <HomeIcon style={{backgroundColor:"#00A699"}} classes={{colorSecondary:"#00A699", color:"#00A699"}} />
                                </TimelineDot>
                                <TimelineConnector />
                              </TimelineSeparator>
                              <TimelineContent>
                              <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="p" component="p">
                                        {props.source}
                                    </Typography>
                                    <Typography variant="caption" >IP:{props.clientip}</Typography>
                              </Paper>
                              </TimelineContent>
                            </TimelineItem>  
                        </Timeline>
        </div>
    )
}

export default TimelineCustom