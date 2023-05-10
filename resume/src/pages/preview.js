import React from 'react'
import Resume from '@/components/Resume'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
function preview() {
  return (
<Box>
<Box>
  <Link href="/resumebuilder">
  <Button variant="outlined">Back to Editor</Button>
  </Link>
    </Box>
<Resume/>
</Box>
  )
}

export default preview