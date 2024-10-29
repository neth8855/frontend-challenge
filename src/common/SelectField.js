import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import React from "react"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"

export default function SelectField({size = 'medium', hasLabel = true, canEmptyValue = false, variant , name, value, options, onChange}) {

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200, // Set max height to limit the dropdown's height
            },
        },
    };

    const handleChange = (e) => {
        onChange(e)
    }

    return (
        <FormControl fullWidth size={size}>
            {hasLabel && <InputLabel id="demo-simple-select-label">{capitalizeFirstLetter(name)}</InputLabel>}
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                name={name}
                label={hasLabel ? name : ''}
                variant={variant}
                onChange={handleChange}
                MenuProps={MenuProps} // Apply custom menu styling here
            >   
                {canEmptyValue && 
                    <MenuItem value="">
                        - Select -
                    </MenuItem>
                }
                {Object.entries(options).map(([code, value]) => (
                    <MenuItem key={code} value={code}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}