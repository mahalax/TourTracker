import { red, blue, orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
export const TextYellow = '#f4c222'
export const darkgray = '#181f4b'
export default makeStyles((theme) => ({

  secondary: {
    color: red[900],
    backgroundColor: red[200],
    padding: '2px',
    borderRadius: '5px'
  },
  primary: {
    color: blue[900],
    backgroundColor: orange[400],
    padding: '2px',
    borderRadius: '5px'
  },

  searchInput: {
    width: '75%',
    "& label.Mui-focused": {
      color: darkgray
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: darkgray,
      }
    }
  },

  root: {
    width: '100%',
    overflowX: 'auto',
  },
  root1: {
    width: '100%',
    overflowX: 'auto',
    marginTop: '40px',
  },
  root2: {
    "& label.Mui-focused": {
      color: darkgray
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: darkgray,
      }
    },
  },
  dateerror: {
    color: "red",
    paddingLeft: "10px"
  },

  aligncenter: {
    textAlign: 'center',
    padding: '20px',
    justifyContent: 'center'
  },
  sublink: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
    },

  },
  actioncell_width: {
    display: "flex"
  },
  cell_width: {
    maxWidth: "100px",
    overflow: "hidden",
    textOverflow: "clip",
    whiteSpace: "nowrap"
  },
  newButton: {
    '&.MuiButton-outlinedPrimary': {
      color: 'black',
      backgroundColor: TextYellow,
      '&:hover': {
        color: TextYellow,
        backgroundColor: darkgray
      },
    }
  },
  iconColor: {
    color: TextYellow,
  },
  submit: {
    '&.MuiButton-containedPrimary': {
      color: "black",
      backgroundColor: TextYellow,
      margin: '2px',
      "&:hover": {
        color: TextYellow,
        backgroundColor: darkgray
      }
    }
  },
  alignright: {
    textAlign: 'right',
    padding: '2px'
  },
  alignleft: {
    textAlign: 'left',
    padding: '2px'
  },
padding  :{
  paddingLeft:"20px",
  paddingRight:"20px"
},

searchbtnpadding:{
  padding:"20px 20px 0px 20px"
},

}))



