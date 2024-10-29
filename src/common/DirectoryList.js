import React from "react"
import directories from "../data/countries_and_directories.json"
import logosUrl from "../data/directory_logos.json"
import { ButtonBase, Typography } from "@mui/material"
import DataModal from "./DataModal";

export default function DirectoryList({id, country, token}) {
    const [open, setOpen] = React.useState(false);
    const [params, setParams] = React.useState({id: "", directory: "", token: ""});
  
    const handleClickOpen = (id, directory, token) => {
      setOpen(true);
      setParams({id, directory, token})
    };
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <React.Fragment>
            <Typography variant="h6" gutterBottom component="div">
                Directory List <small style={{color: 'gray'}}>(click image to view details)</small>
            </Typography>
            {directories[country].map((directory, ind) => {
                return(
                    <ButtonBase 
                        key={`${directory}${ind}`}
                        onClick={() => handleClickOpen(id, directory, token)}
                    >
                        <img
                            src={logosUrl[directory]}
                            width="30"
                            alt="Uberall Logo"
                            style={{margin: 2}}
                        />
                    </ButtonBase>
                )
            })}
            <DataModal open={open} params={params} handleClose={handleClose} />
        </React.Fragment>
    )
}