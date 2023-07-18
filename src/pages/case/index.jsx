import React from 'react'
import { Box, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

const Title = styled(Box)(({ theme }) => ({
    ...theme.typography.h1,
    margin: theme.spacing(4),
    marginBottom: theme.spacing(0),
    textAlign: 'center'
}));

const MainScreen = styled(Box)(() => ({
    maxWidth: '900px',
    margin: 'auto'
}));

function Case() {
    const { bookNumber, caseNumber } = useParams()

    return (
        <>
            <MainScreen sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Title>Livro {bookNumber}</Title>
                    </Grid>
                    <Grid item xs={12}>
                        {bookNumber}{caseNumber}
                    </Grid>
                </Grid>
            </MainScreen>
        </>
    );
}
export default Case;