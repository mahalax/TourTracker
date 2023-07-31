import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        bottom:theme.spacing(1),
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    add_btn_close:{
               color:'red',
      
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup,width } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth={width ? width : "xs"} classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                                       
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon className={classes.add_btn_close} />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}