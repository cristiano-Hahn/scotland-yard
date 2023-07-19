import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import json from '../../assets/scotland_yard_tips.json';

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

const findClues = (bookNumber, caseNumber) => {
  const book = json.books.find((b) => b.number == bookNumber);
  const caseObject = book.cases.find(c => c.number == caseNumber) || {};

  return caseObject?.clues;
}

function Case() {
  const { bookNumber, caseNumber } = useParams()
  const clues = findClues(bookNumber, caseNumber);
  const [unlocked, setUnlocked] = useState([]);

  const onChange = (clue) => {
    if (window.confirm(`Tem certeza que deseja abrir a dica ${clue.name}?`))
      setUnlocked([...unlocked, clue.name]);
  }

  return (
    <>
      <MainScreen sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <Title>Caso {caseNumber}</Title>
          </Grid>
          <Grid item xs={12}>
            {clues.map(clue =>
              <Accordion onChange={(e) => { onChange(clue) }} expanded={unlocked.includes(clue.name)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{clue.name}: {clue.number}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {clue.tip}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}
          </Grid>
        </Grid>
      </MainScreen>
    </>
  );
}
export default Case;