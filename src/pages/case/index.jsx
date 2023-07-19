import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, styled, Button } from '@mui/material';
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

const findCurrentCase = (bookNumber, caseNumber) => {
  const book = json.books.find((b) => b.number === parseInt(bookNumber));
  return book.cases.find(c => c.number === parseInt(caseNumber)) || {}
}

function ExpandButton({ unlocked }) {
  if (unlocked) {
    return <ExpandMoreIcon />
  } else {
    return <Button variant='contained' color='error'>Revelar</Button>
  }
}

function Case() {
  const { bookNumber, caseNumber } = useParams()
  const [currentCase, setCurrentCase] = useState({ clues: [] })
  const [unlockedClues, setUnlockedClues] = useState(new Set([]));
  const [expandedClues, setExpandedClues] = useState(new Set([]));

  useEffect(() => {
    setCurrentCase(findCurrentCase(bookNumber, caseNumber));
  }, [])

  const onChange = (clueName) => {
    if (!unlockedClues.has(clueName)) {
      if (window.confirm(`Tem certeza que deseja abrir a dica ${clueName}?`))
        setUnlockedClues(new Set([...unlockedClues, clueName]));
      setExpandedClues(new Set([...expandedClues, clueName]))
    } else {
      let updated = new Set(expandedClues)
      if (expandedClues.has(clueName)) {
        updated.delete(clueName)

      } else {
        updated.add(clueName)
      }
      setExpandedClues(updated)
    }
  }
  
  return (
    <>
      <MainScreen sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <Title>Caso {caseNumber}</Title>
          </Grid>
          <Grid item xs={12}>
            {currentCase.clues.map(clue =>
              <Accordion
                onChange={() => { onChange(clue.name) }}
                expanded={expandedClues.has(clue.name)}
                key={clue.number}
              >
                <AccordionSummary
                  expandIcon={<ExpandButton unlocked={unlockedClues.has(clue.name)} />}
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
export default Case