import React from 'react'
import { Link } from "react-router-dom";

export default function UserPage(props) {
    const pathname = props.location.pathname.substring(7);
    return (
        <Link to="/">
            <img src={`${pathname}`} style={{width:500}}alt="placeholder"></img>
        </Link>
    )
}
