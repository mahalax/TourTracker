import { Button } from "@material-ui/core";
import axios from "axios";
import {baseURL} from '../../store/api'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useStyles from '../../styles/styles'
import { getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { dispatchGetUser } from "../../store/actions/auth";
import { useDispatch } from "react-redux";

function ProfilePicUpload(props) {
  const {profileurl} = props
  const router = useRouter()
  const dispatch = useDispatch()
  const classes =  useStyles()
  const [file, setFile] = useState("");
const [profilepic,setProfilepic] =  useState("")
  const inputRef = useRef(null);


  const [Token,setToken] = useState("")

  useEffect(() => {
    async function fetch_session() {
        const session = await getSession()
        if (!session) {
            router.push(`${baseURL}`,3);
        }
        if (session) {
            setToken(session?.user?.accessToken);
            dispatch(dispatchGetUser(session?.user?.accessToken));
        }
    }
    fetch_session()

}, [ file]);

 // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    {!file && inputRef.current.click();}
    handleSubmit(event)
  };

  const handleFileChange = async (e) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  }

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    if(!file) return;
    const formData = new FormData();
    formData.append("image", file)
    formData.append("name", file.name)
    const config = {
      headers:{
        "content-type": "multipart/form-data",
        "authorization" : Token
      },
      
    }

    try{
      const res = await axios.post("/api/uploadprofilepic",formData,config)
      setProfilepic(res.data.imageUrl)
      setFile("")
      console.log("re.imageurl : ",res )
    }catch(error){
      console.log(error)
    }

  }


   

  return (
    <form >
    <div className='profileUploadSection'>
    
<div style={{alignSelf:"center",width: "150px",height:"150px",border: "1px solid black", borderRadius: "50%"}}>
    {profileurl && <img src = {profileurl} style={{alignSelf:"center",width: "150px",height:"150px", borderRadius: "50%"}} alt="Profile Pic"/>}
    </div>
    
     {/*  Our custom button to select and upload a file */}
     <Button
                color="primary"
                variant="contained"
                onClick={handleClick}
                className={classes.submit}
              >
    
        {file ? 'Upload' : 'Change Photo'}
      </Button>

      {/* 👇 Notice the `display: hidden` on the input */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        name="profilepic"
        style={{display: 'none'}}
      />
    </div>
    </form>
  )
}

export default ProfilePicUpload;