import React from 'react'
import { useState,useEffect } from "react";

function Resume() {
    const [resumeData,setResumeData]=useState({
        fname: "",
    email: "",
    phone: "",
    image: null,
    imagePreview: "" ,
    title:'',
    lName:"",
        // add more properties here
      })
     
    useEffect(() => {
        const savedData = localStorage.getItem("resumeData");
        console.log("Loaded data from localStorage:", savedData);
        if (savedData) {
            setResumeData(JSON.parse(savedData));
          }
    },[])
  return (
    <div>
        Resume
        <h1>
        {resumeData.title}<br/>
        {resumeData.email}<br/>
        {resumeData.phone}<br/>
        {resumeData.fname}<br/>
        {resumeData.lName}<br/>
        {resumeData.address}<br/>
        {resumeData.profile}<br/>

          </h1>
          {resumeData.image&&resumeData.imagePreview  &&(<img src={resumeData.imagePreview} alt="Uploaded Image" />)}
        </div>
  )
}

export default Resume