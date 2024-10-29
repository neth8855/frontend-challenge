import { Box, CircularProgress, Typography } from "@mui/material"
import React from "react"

export default function CircularLoading() {
    return(
        <Box sx={{ p: 10, position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={130} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                    Fetching data...
                </Typography>
            </Box>
        </Box>
    )
}