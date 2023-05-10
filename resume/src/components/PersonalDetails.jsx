import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

function PersonalDetails() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameLinkPairs, setNameLinkPairs] = useState([]);

  const [employment ,setEmployment]=useState({
    employer:"",
    jobtitle:"",
    startDate:"",
    endDate:"",
    city:"",
    description:""
  })
  const [allEmployHistory,setAllEmployHistory]=useState([])
  const [resumeData, setResumeData] = useState({
    fname: "",
    email: "",
    phone: "",
    image: null,
    imagePreview: null ,
    title:'',
    lName:"",
    address:"",
    Skills:[]

  });
//   const [file, setFile] = useState()

//   function handleChange(event) {
//     setFile(event.target.files[0])
//   }
  // Load saved data from local storage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    const namelink=localStorage.getItem("nameLinkPairs")
    console.log("Loaded data from localStorage:", savedData,namelink);
    if (savedData) {
      setResumeData(JSON.parse(savedData));
      {namelink&&setNameLinkPairs(JSON.parse(namelink))}
    }
  }, []);

  const setData = () => {
    // Save the data to local storage whenever it changes
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    localStorage.setItem("nameLinkPairs", JSON.stringify(nameLinkPairs));
    localStorage.setItem("employment",JSON.stringify(allEmployHistory))
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      // ... (existing code for handling file input)
    } else if (name === "Skills") {
      // Extract skills from the value entered by the user and store it in an array
      const skills = value.split(",").map(skill => skill.trim());
      setResumeData((prevData) => ({
        ...prevData,
        [name]: skills
      }));
    } else {
      setResumeData((prevData) => ({
        ...prevData,
        [name]: value
      }));
      setEmployment((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }
  };
  const handleDelete = (index) => {
    setNameLinkPairs(nameLinkPairs.filter((_, i) => i !== index));
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleAddMore = () => {
    if (name && link) {
      setNameLinkPairs([...nameLinkPairs, { name, link }]);
      setName("");
      setLink("");
    }

  };
  const handleAddMore1 = () => {
    if (employment.title&& employment.employer && employment.description) {
    setAllEmployHistory([...allEmployHistory,employment])
      setEmployment({
        employer:"",
        jobtitle:"",
        startDate:"",
        endDate:"",
        city:"",
        description:""
      })
    }

  };

  return (
    <Box sx={{display:"flex",flexDirection:'column',rowGap:"30px"}}>
        <Box sx={{display:"flex",flexDirection:'column',rowGap:"30px"}}>
      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "50% 50%",
        }}
      >
        <Box className="column">
        
          


          <TextField id="filled-basic" label="Job Title" variant="filled" 
           name="title"  value={resumeData.title}
           onChange={handleInputChange}
          />
        </Box>
        <Box className="column">
       
         


          <input type="file" name="image"  onChange={handleInputChange}  />
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "50% 50%",
        }}
      >
        <Box className="column">
        
          


          <TextField id="filled-basic" label="First Name" variant="filled" 
           name="fname"  value={resumeData.fname}
           onChange={handleInputChange}
          />
        </Box>
        <Box className="column">
       
         

<TextField id="filled-basic" label="Last Name" variant="filled" 
           name="lName"  value={resumeData.lName}
           onChange={handleInputChange}
          />
         
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "50% 50%",
        }}
      >
        <Box className="column">
        
          


          <TextField id="filled-basic" label="Phone" variant="filled" 
           name="phone"  value={resumeData.phone}
           onChange={handleInputChange}
          />
        </Box>
        <Box className="column">
       
         

<TextField id="filled-basic" label="Email" variant="filled" 
           name="Email"  value={resumeData.email}
           onChange={handleInputChange}
          />
         
        </Box>
      </Box>

      <Box  sx={{
          display: "flex",
        
        }}>
      <textarea
          
          name="address"
         placeholder="Address"
          className="field"
          onChange={handleInputChange}
          value={resumeData.address}
        />
      </Box>

      <Box  sx={{
          display: "flex",
        
        }}>
      <textarea
       placeholder="Profile Summery"
          name="profile"
          onChange={handleInputChange}
          className="field"
          value={resumeData.profile}
        />
      </Box>
      </Box>
     {/*Profile and project links */}
     <Box sx={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "50% 50%",
        }}>
     <TextField id="filled-basic" label="Name" variant="filled" 
        type="text"
      
        value={name}
        onChange={handleNameChange}
        helperText="Add profile name or project name"
      />
      <TextField id="filled-basic" label="Link" variant="filled" 
        type="text"
        helperText="Add profile link or project link"
        value={link}
        onChange={handleLinkChange}
      />
     
</Box> 
<Box>
<Button onClick={handleAddMore} variant="outlined">Add+</Button>
      <ul>
        {nameLinkPairs.map((pair, index) => (
          <li key={index}>
            <strong>Name:</strong> {pair.name}, <strong>Link:</strong>{" "}
            {pair.link}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
</Box>
{/* Skills */}
<Box>
  <TextField
    id="filled-basic"
    label="Skills"
    variant="filled"
    name="Skills"
    // value={resumeData.Skills.join(", ")} // Join the skills array to display in the input field
    onChange={handleInputChange}
    helperText="Enter skills separated by commas like react,java,python"
  />
  {resumeData.Skills.length>=1 && resumeData.Skills.map((data)=>(
        <p>{data}</p>
        ))}
  {/* <datalist id="myDropdown">
  <option value="React">React</option>
  <option value="java"> java</option>
  <option value="Html5">Html5</option>
</datalist> */}
</Box>
{/* Employment History */}
<Box>
<Box sx={{display:"flex",flexDirection:'column',rowGap:"30px"}}>
      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "50% 50%",
        }}
      >
        <Box className="column">
        
          


          <TextField id="filled-basic" label="Job Title" variant="filled" 
           name="title"  
           value={employment.title}
           onChange={handleInputChange}
          />
        </Box>
        <Box className="column">
       
         

        <TextField id="filled-basic" label="Employer" variant="filled" 
           name="employer" 
           onChange={handleInputChange}
           value={employment.employer}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "50% 50%",
        }}
      >
        <Box className="column">
        
          


          <TextField id="filled-basic" label="Start Date" variant="filled" 
           name="startDate"  
           onChange={handleInputChange}
           value={employment.startDate}
          />
        </Box>
        <Box className="column">
       
         

<TextField id="filled-basic" label="End Date" variant="filled" 
           name="endDate"  
           onChange={handleInputChange}
           value={employment.endDate}
          />
         
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "50% 50%",
        }}
      >
        <Box className="column">
        
          


          <TextField id="filled-basic" label="country" variant="filled" 
           name="country"  
           onChange={handleInputChange}
           value={employment.country}
          />
        </Box>
        <Box className="column">
       
         

<TextField id="filled-basic" label="city" variant="filled" 
           name="city"  
           onChange={handleInputChange}
           value={employment.city}
          />
         
        </Box>
      </Box>

      <Box  sx={{
          display: "flex",
        
        }}>
      <textarea
          
          name="description"
         placeholder="description"
          className="field"
          onChange={handleInputChange}
          value={employment.description}
        />
      </Box>

      <Button onClick={handleAddMore1} variant="outlined">Add+</Button>
       {employment.city}<br/>
       {employment.country}<br/>
       {employment.title}
      
      </Box>



</Box>
      {/* Educational Deatils */}
 <Box>
        
        </Box>
        
        


      <Button variant="outlined" onClick={setData}>save</Button>
      {/* Add more input fields here */}
      
     

    {/* {resumeData.image&&resumeData.image instanceof Blob &&(<img src={resumeData.imagePreview} alt="Uploaded Image" />)} */}
        <br />
       
      
    </Box>
  );
}

export default PersonalDetails;
