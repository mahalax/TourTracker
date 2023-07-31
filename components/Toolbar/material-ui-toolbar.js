import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

import MoreIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link'
import { useMediaQuery } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import { useSession,getSession} from 'next-auth/react';
import { useSelector } from 'react-redux';
const TextYellow = '#f4c222'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    cursor:'pointer',
    //paddingBottom:'4px',
    '&:hover': {
      color: TextYellow,
      borderBottom: '3px solid #f4c222'
      },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
 
  
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  link:{
    color:'white',
    textDecoration:'none',
    
  },
  sublink:{
    color:'black',
   
    textDecoration:'none',
    '&:hover': {
      color: TextYellow,
      backgroundColor:'#181f4b',
      borderBottom: '3px solid #f4c222'
      },
    fontSize: 15,
  
  },
  background:{
    backgroundColor:'#181f4b',
  },
  
  
 
  
}));

export default function HeaderNavBar(props) {
const {logoutUser}=props
console.log("props: ",props)
  const isActive = useMediaQuery("(max-width:769px)");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileMoreAnchorE2, setMobileMoreAnchorE2] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpen2 = Boolean(anchorE2);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
const {data : session } = useSession()
  

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen2 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuClose2 = () => {
    setMobileMoreAnchorE2(null);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuClose2 = () => {
    setAnchorE2(null);
    handleMobileMenuClose2();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen2 = (event) => {
    setMobileMoreAnchorE2(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
 

  const menuId2 = 'primary-search-account-menu2';
  const renderMenu2 = (
    <Menu
      anchorEl={anchorE2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId2}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen2}
      onClose={handleMenuClose2}
    >
      <MenuItem className={classes.sublink} onClick={handleMenuClose2} style={{ fontSize: 12 }}>Hello {session?.user?.email}</MenuItem>
           <Link href='#' passHref><MenuItem className={classes.sublink} onClick={logoutUser}  >Logout</MenuItem></Link>
    </Menu>
  );


 

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.background}>
        <Toolbar>
        
        
          <Typography  variant="h6" noWrap>
             Tour <span id='heading'>Tracker </span>
             <span style={{paddingLeft :"20px"}}> | Welcome, {session?.user?.role}</span>
          </Typography>

          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
     
             <p className={classes.menuButton}
              edge="end"
              aria-label="basic settings"
              aria-controls={menuId2}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen2}
              color="inherit"
            >
             <PersonIcon style={{ fontSize: 20}}/> 
             </p>
            
          </div>
          
        </Toolbar>
      </AppBar>
     
      {renderMenu2}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session) {
    return {
      props: {}
    }
  }
  return {
    props: { session },
  }
}