import { Button, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Pagination({ isLoading, totalCount, maxRowsPerPage, onPageChange }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => { setOffset(0)}, [maxRowsPerPage])

  // Calculate the total number of pages
  let totalPages = 0;
  if(totalCount > 0){
    const pageNum = totalCount / maxRowsPerPage;
    while(totalPages < pageNum){
        totalPages++;
    }
  }else{
    totalPages = 1
  }

  // Calculate the current page based on offset and maxRowsPerPage
  const currentPage = Math.floor(offset / maxRowsPerPage) + 1;

  // Handlers for navigation
  const handlePrevious = () => {
    if (offset > 0) {
      const newOffset = offset - maxRowsPerPage;
      setOffset(newOffset);
      onPageChange(newOffset);
    }
  };

  const handleNext = () => {
    if (offset + maxRowsPerPage < totalCount) {
      const newOffset = offset + maxRowsPerPage;
      setOffset(newOffset);
      onPageChange(newOffset);
    }
  };

  return (
    <Grid2 sx={{display: 'flex', alignContent: 'start', height: 35}}>
      {isLoading ? <Typography mr={10} mt={1}>Loading...</Typography> :
      <>
        <Button variant="contained" onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
        </Button>
        <Typography m={1}>
            Page {currentPage} of {totalPages}
        </Typography>
        <Button variant="contained" onClick={handleNext} disabled={currentPage === totalPages}>
            Next
        </Button>
      </>
      }
    </Grid2>
  );
}