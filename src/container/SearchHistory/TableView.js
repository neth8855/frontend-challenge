import React from "react"
import { StyledTableCell } from "../../styledComponent/styledTable";
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import TableCollapseView from "./TableCollapseView";

export default function TableView({dataItems}) {
    const columns = [
        { id: 'name', label: 'Name', minWidth: 110, align: 'left' },
        { id: 'street', label: 'Street and Number', minWidth: 130, align: 'left' },
        { id: 'city', label: 'City', minWidth: 80, align: 'center' },
        { id: 'country', label: 'Country', minWidth: 80, align: 'center' },
        { id: 'province', label: 'Province', minWidth: 80, align: 'center' },
        { id: 'zip', label: 'Zip/postcode', minWidth: 80, align: 'center' },
        { id: 'action', label: 'Action', minWidth: 80, align: 'center' },
    ];
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell 
                                key={column.id} 
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {dataItems.map((row) => (
                    <TableCollapseView key={row?.id} row={row} columns={columns}/>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}