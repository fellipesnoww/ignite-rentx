import React from "react";
import { Container } from "./styles";

interface Props {
    active?: boolean;
}


export default function Bullet({active = false}: Props){
    return (
        <Container active={active}/>                    
    )
}