import React from "react";
import { StyledTableCell, StyledTableRow } from "../../styledComponent/styledTable";
import { Box, ButtonBase, Collapse, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DirectoryList from "../../common/DirectoryList";

export default function TableCollapseView({row, columns}) {
  const [open, setOpen] = React.useState(false)

  return(
    <React.Fragment>
        <StyledTableRow hover key={row.id}>
            <StyledTableCell align={columns[0].align}> 
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                > 
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {row.name}
            </StyledTableCell>
            <StyledTableCell align={columns[1].align}>{row.streetAndNo}</StyledTableCell>
            <StyledTableCell align={columns[2].align}>{row.city}</StyledTableCell>
            <StyledTableCell align={columns[3].align}>{row.country}</StyledTableCell>
            <StyledTableCell align={columns[4].align}>{row.province}</StyledTableCell>
            <StyledTableCell align={columns[5].align}>{row.zip}</StyledTableCell>
            <StyledTableCell align={columns[6].align}>
                <Tooltip title="Redirect to Short Url">
                    <ButtonBase href={row.shortUrl} target="_blank" sx={{ml: 1}}>
                        <OpenInNewIcon/>
                    </ButtonBase>
                </Tooltip>
            </StyledTableCell>
        </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
                <DirectoryList id={row?.id} country={row?.country} token={row?.token} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}