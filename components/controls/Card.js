import React from 'react'
import {
    Box,
    Card,
    CardContent,
    CardActionArea,
    Typography,
    CardActions,
    Button,
    Avatar,
    CardHeader,
    IconButton,
    Grid
  } from "@material-ui/core";
  import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
  import MoreVertIcon from "@material-ui/icons/MoreVert";
  
  const useStyles = makeStyles(theme => ({
    
      root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
          margin: theme.spacing(3),
        },
      },
  
      cardcontent:{
        "& .appear-item": {
          display: "none"
        },
        "&:hover .appear-item": {
          display: "block"
        }
      }
    })
  );
  
  

export default function MuiCard(props) {

    const { calc_fuction,title,cardcontenttext,cardheader,avatar,home_currency } = props
    const classes = useStyles();

  return (
   
    <Box className={classes.root}>
      <Card>
        <CardActionArea onClick={calc_fuction} >
          <CardContent style={{ backgroundColor: "wheat" }} >
            <Typography style={{ color: "darkblue" }} variant="h4" >{title} </Typography>
            <Typography style={{ color: "red"}} variant="h5">{cardcontenttext} 
            <span style={{ color: "darkorange",fontSize:'15px'}}>&nbsp;&nbsp;{home_currency}</span></Typography>
          </CardContent>
          {/*<CardHeader style={{ color: "gray", fontFamily: "Raleway" }} variant="h5"
            avatar={<Avatar>{avatar}</Avatar>}
            title={cardheader}
  /> */}
        </CardActionArea>
      </Card>
    </Box>

  )
}