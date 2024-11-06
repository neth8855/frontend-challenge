import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query';
import api from '../utils/axiosInstance';
import { Alert, Backdrop, Divider, Grid2, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, IconButton, Typography, Box } from '@mui/material';
import CircularLoading from './CircularLoading';
import getDayOfWeek from '../utils/getDaysOfWeek';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiPaper-root': {
//     width: 1000
//   },
  '& .MuiDialog-paper': {
    width: 800,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DataModal({open, params, handleClose}) {
    const {id, directory, token} = params
    const [locationData, setLocationData] = useState({})
    const {data: result, isFetching: isLoading, refetch: getSearchData, isError, error} = useQuery({
        queryKey: ["get-search-id"],
        enabled: false,
        retry: false,
        queryFn: () =>
            api.get(`/search/${id}?directory=${directory}&token=${token}`).then((res) => res.data)
    })

    useEffect(() => {
        if(id !== "" && open){
            getSearchData()
        }
    }, [open, id, getSearchData])

    useEffect(() => {
        if(result?.response?.result){
            setLocationData(result?.response?.result)
        }
    }, [result])

    return (
        <React.Fragment>
            {isLoading ?
                <Backdrop invisible={true}
                    sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
                    open={isLoading}
                >
                    <CircularLoading />
                </Backdrop>
            :

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Directory Details
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>

                        {isError ? 
                            <Alert severity="error">Error fetching results. {error?.response?.data?.message}.</Alert>
                        :
                            !isLoading ?
                            <React.Fragment>
                                <Box >
                                    <Grid2 container spacing={4}>
                                        <Grid2 xs={6}>
                                            <Typography variant="subtitle1">Location Info:</Typography>
                                            <Typography variant="body2">
                                            Directory: {locationData.directoryType || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2">
                                            Sync Status: {locationData.syncStatus}
                                            </Typography>
                                            <Typography variant="body2">
                                            Claim Status: {locationData.claimStatus}
                                            </Typography>
                                        </Grid2>
                                        <Grid2 xs={6}>
                                            <Typography variant="subtitle1">Contact Info:</Typography>
                                            <Typography variant="body2">
                                            Website: <a href={locationData.website} target="_blank" rel="noreferrer">{locationData.website}</a>
                                            </Typography>
                                            <Typography variant="body2">
                                            Phone: {locationData.phone || 'Not Provided'}
                                            </Typography>
                                            <Typography variant="body2">
                                            Cellphone: {locationData.cellphone || 'Not Provided'}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>

                                    <Divider sx={{ my: 2 }} />
                                    {/* Address Information */}
                                    <Typography variant="subtitle1">Address:</Typography>
                                    <Typography variant="body2">
                                        {locationData.streetAndNo}, {locationData.city}, {locationData.zip}, {locationData.country}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="subtitle1">Opening Hours:</Typography>
                                    <List dense>
                                        {locationData.openingHours?.map((hour, index) => (
                                            <ListItem key={index}>
                                            <ListItemText
                                                primary={`${getDayOfWeek(hour.dayOfWeek)}: ${hour.from1} - ${hour.to1}`}
                                            />
                                            </ListItem>
                                        )) || <Typography variant="body2">Not Available</Typography>}
                                    </List>

                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="subtitle1">Categories:</Typography>
                                    <List dense>
                                        {locationData.categories?.map((category, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={category.fullName} />
                                            </ListItem>
                                        )) || <Typography variant="body2">Not Available</Typography>}
                                    </List>

                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="subtitle1">Other Details:</Typography>
                                    <Typography variant="body2">
                                        Rating: {locationData.rating || 'No rating'}
                                    </Typography>
                                    <Typography variant="body2">
                                        Photos: {locationData.photosStatus}
                                    </Typography>
                                </Box>
                            </React.Fragment>
                            :
                            <Box>
                                
                            </Box>
                        }
                    </DialogContent>
                </BootstrapDialog>
            }
        </React.Fragment>
    );
}