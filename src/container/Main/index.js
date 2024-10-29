import React, { useState } from "react"
import { useQuery } from "react-query"
import api from "../../utils/axiosInstance"
import { Alert, Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material"
import countryNames from "../../data/country_names.json"
import SelectField from "../../common/SelectField"
import Header from "../../common/Header"
import SearchResult from "./SearchResult"

export default function Main() {
    const [searchParams, setSearchParams] = useState({ country: '', name: "", street: "", zip: "" });
    const inputArray = [
        {name: "name", label: "Business name", placeholder: "e.g. Jane's bakery", value: "Jane's Bakery"}, 
        {name: "street", label: "Street and Number", placeholder: "e.g. 600 California Street", value: "600 California Street"}, 
        {name: "zip", label: "Zip/postcode", placeholder: "e.g. 94108", value: "94108"}
    ];
    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };
    const {data: result, isFetching: isLoading, refetch: getSearchData, isError, error} = useQuery({
        queryKey: ["get-search-data"],
        enabled: false,
        retry: false,
        queryFn: () =>
            api.post("/search", {
                ...searchParams
            }).then((res) => res.data)
    })
    const handleSearch = () => getSearchData()
    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Box my={4} mt={8} textAlign="center">
                    <Header />
                </Box>
                <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <SelectField
                            name="country"
                            variant="outlined"
                            value={searchParams.country} 
                            options={countryNames} 
                            canEmptyValue={true}
                            onChange={handleChange}
                        />
                        {inputArray.map((item) => {
                            return (
                                <TextField
                                    key={item?.name}
                                    name={item?.name}
                                    label={item?.label}
                                    type="text"
                                    value={searchParams[`${item}`]?.name}
                                    onChange={handleChange}
                                    placeholder={item.placeholder}
                                    variant="outlined"
                                    fullWidth
                                />
                            )
                        })}
                        <Button
                            onClick={handleSearch}
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            fullWidth
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Search"}
                        </Button>
                        <Button href="/history" variant="text" sx={{textTransform: 'none'}}>Search History</Button>
                    </Box>
                </Paper>
            </Container>
            <Container>
                {isError && (
                    <Alert severity="error">Error fetching results. {error?.response?.data?.message}.</Alert>
                )}
                {result && !isError && !isLoading && (
                    <Box m={4}>
                        <Typography variant="h5" gutterBottom>
                            Search Result
                        </Typography>
                        <SearchResult dataItem={result?.response} />
                    </Box>
                )}
            </Container>
        </React.Fragment>
    );
}