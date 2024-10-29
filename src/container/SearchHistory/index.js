import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import api from "../../utils/axiosInstance"
import { Alert, Backdrop, Box, ButtonBase, Container, Grid2, Paper, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import Header from "../../common/Header"
import SelectField from "../../common/SelectField"
import { arrayPerPage } from "../../constant/arrayPerPage"
import Pagination from "../../common/Pagination"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularLoading from "../../common/CircularLoading";
import TableView from "./TableView";

export default function SearchHistory() {
    const [offset, setOffset] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(0)
    const {data: result, isFetching: isLoading, refetch: getSearchData, isError, error} = useQuery({
        queryKey: ["get-search-history"],
        enabled: true,
        retry: false,
        queryFn: () =>
            api.get(`/search?max=${arrayPerPage[rowsPerPage]}&offset=${offset}`).then((res) => res.data)
    })
    const handleChange = (e) => {
        setRowsPerPage(e.target.value)
        setOffset(0);
    }
    const handlePageChange = (newOffset) => {
      setOffset(newOffset);
    };
    useEffect(() => {
        getSearchData()
    }, [offset, rowsPerPage, getSearchData])

    return (
        <Container maxWidth="lg">
            <Box mt={4} textAlign="center">
                <Header />
            </Box>
            <ButtonBase href="/">
                <Grid2 sx={{display: 'flex', alignItems: 'center', ml: '-3px'}}>
                    <ArrowBackIcon fontSize="small"/> 
                    <Typography mt={0.5}>
                        Back
                    </Typography>
                </Grid2>
            </ButtonBase>
            <Grid container spacing={2} mb={1}>
                <Grid size={6} sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}> 
                    <Typography variant="h5" gutterBottom>
                        Search History
                    </Typography>
                </Grid>
                <Grid size={6} sx={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                    <Grid size={2.5}>
                        <SelectField
                            hasLabel={false}
                            variant="outlined"
                            name="RowsPerPage"
                            value={rowsPerPage} 
                            options={arrayPerPage} 
                            size="small"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Typography ml={1}>
                        entries per page
                    </Typography>
                </Grid>
            </Grid>
            {isError && (
                <Alert severity="error">Error fetching results. {error?.response?.data?.message}.</Alert>
            )}

            {isLoading && 
                <Backdrop invisible={true}
                    sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
                    open={isLoading}
                >
                    <CircularLoading />
                </Backdrop>
            }

            {result && !isError && (
                <Box>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                        <TableView dataItems={result?.response?.results} />
                    </Paper>
                    <Grid container spacing={2} mt={2} mb={2}>
                        <Grid size={6} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography mr={1}>
                                Showing {offset + 1} to {offset + result?.response?.results.length} of {result?.response?.count} entries
                            </Typography>
                        </Grid>
                        <Grid size={6} sx={{display: 'flex', justifyContent: 'right', alignContent: 'center'}}>
                            <Pagination
                                isLoading={isLoading}
                                totalCount={result?.response?.count}
                                maxRowsPerPage={arrayPerPage[rowsPerPage]}
                                onPageChange={handlePageChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    );
}