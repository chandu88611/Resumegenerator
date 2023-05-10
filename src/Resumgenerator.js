import React, { useState, useEffect } from "react";

function ResumeGenerator() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    // add more properties here
  });

 
    // Load saved data from local storage when the component mounts
    useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    console.log("Loaded data from localStorage:", savedData);
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
},[])

 const setData=() => {
    // Save the data to local storage whenever it changes
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    console.log("Saved data to localStorage:", resumeData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setResumeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={resumeData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={resumeData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={resumeData.phone}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={setData}>sava and next</button>
      {/* Add more input fields here */}
      <h1>
        {resumeData.name}<br/>
        {resumeData.email}<br/>
        {resumeData.phone}<br/>

      </h1>
    </div>
  );
}

export default ResumeGenerator;
