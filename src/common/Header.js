import { ButtonBase } from "@mui/material"
import React from "react"

export default function Header() {
    return (
        <ButtonBase href="/">
            <img
                src="https://uberall.com/images/uberall-logo-light.svg"
                width="200"
                alt="Uberall Logo"
            />
        </ButtonBase>
    )
}