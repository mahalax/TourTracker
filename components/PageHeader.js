import React from 'react'
import { Paper, Card, Typography, makeStyles, Button } from '@material-ui/core'
import { Divider } from '@mui/material';
import { TextYellow,darkgray } from '../styles/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#f4c222'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        },
        color:darkgray,
       
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader} >
                
                <div  className='headerIcon'>
                    {/*{icon} */}
                    
                </div>
                
                <div className={`${classes.pageTitle} headerTitle`} >
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}