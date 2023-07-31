import { makeStyles } from '@material-ui/core/styles';
const TextYellow = '#f4c222'
const darkgray = '#181f4b'
export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    "& label.Mui-focused": {
      color: darkgray
    },
  "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: darkgray,
        
      }
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: TextYellow,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform:'capitalize',
    color: "black",
    background:TextYellow,
    "&:hover": {          
      color: TextYellow,
      background:'#181f4b'
      
    }
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    textTransform:'capitalize'
  },
  signin_signout_btn:{
    fontSize:'13px',
    color:'black',
    '&:hover': {color:'blue',cursor:'pointer',},
    textDecoration:'none',
    textAlign:'center',
    
  },
  error:{
    color:'red',
    fontSize:'14px',
  },
view:{
  color:'white',
  textDecoration:'none'
}
 
}));