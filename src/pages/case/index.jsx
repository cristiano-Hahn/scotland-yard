import React from 'react'
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function Case() {
    const {caseNumber} = useParams()
    return (
        <Button variant='contained'>CASE {caseNumber}</Button>
    );
}

export default Case;