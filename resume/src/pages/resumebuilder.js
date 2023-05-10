import PersonalDetails from "@/components/PersonalDetails"
import { Box, Button } from "@mui/material"
import Resume from "@/components/Resume"
import "../components/components.css"
import Link from "next/link"
function resumebuilder() {
  return (
    <>
    <Box sx={{display:"grid",gridTemplateColumns:{md:"70% 20%",sm:"90%",xs:'90%'},gridGap:'40px'}}>
    <Box sx={{display:'flex'}}> 
    <PersonalDetails/>
    {/* <Button variant="outlined" onClick={"setData"}>Next</Button> */}
      </Box>
      <Box>
  <Link href="/preview">
  <Button variant="outlined">Preview</Button>
  </Link>
    </Box>
    </Box>
    
    
    </>
  )
}

export default resumebuilder