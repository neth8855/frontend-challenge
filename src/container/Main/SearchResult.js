import { Paper, Typography } from "@mui/material"
import React from "react"
import countryNames from "../../data/country_names.json"
import DirectoryList from "../../common/DirectoryList"

export default function SearchResult({ dataItem }) {
    const { searchData } = dataItem
    return (
        <Paper elevation={1} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Name: {searchData?.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Location: {searchData?.streetAndNo}, {searchData?.zip} {searchData?.city}, {countryNames[searchData?.country]}
            </Typography>
            <DirectoryList id={searchData?.id} country={searchData?.country} token={searchData?.token} />
        </Paper>
    )
}