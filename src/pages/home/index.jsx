import React from 'react'
import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import scotlandYardTips from '../../assets/scotland_yard_tips.json'

const Title = styled(Box)(({ theme }) => ({
    ...theme.typography.h1,
    margin: theme.spacing(4),
    marginBottom: theme.spacing(0),
    textAlign: 'center'
}));

const Book = styled(Box)(({ theme }) => ({
    ...theme.typography.h4,
    margin: theme.spacing(2),
    color: theme.palette.text.primary,
}));

const CaseButton = styled(Button)(({ theme }) => ({
    ...theme.typography.body1,
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    width: '100%',
    maxWidth: '170px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
}));

const MainScreen = styled(Box)(({ theme }) => ({
    maxWidth: '900px',
    margin: 'auto'
}));


function Home() {
    return (
        <>
            <MainScreen sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid xs={12}>
                        <Title>Scotland Yard</Title>
                    </Grid>
                    <Grid xs={12}>
                        {scotlandYardTips.books.map((book) =>
                            <Grid container >
                                <Grid xs={12}>
                                    <Book>{book.name}</Book>
                                </Grid>

                                {book.cases.map((caseNumber) =>
                                    <Grid sm={3} xs={6}  style={{display: 'flex', justifyContent: 'center'}}>
                                        <CaseButton variant='contained'>{caseNumber.name}</CaseButton>
                                    </Grid>
                                )}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </MainScreen>
        </>
    );
}

export default Home;