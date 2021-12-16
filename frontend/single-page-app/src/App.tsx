import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button, Pane, Text, Spinner, majorScale } from 'evergreen-ui';
import { Route, Router, Routes } from 'react-router';
import View from './View';

function Main() {
  const [value, setValue] = React.useState<any>('**Hello world!!!**');
  const [quote, setQuote] = React.useState<any>();
  React.useEffect(() => { fetch('https://ji84k2mag9.execute-api.us-east-1.amazonaws.com/prod/')
      .then((response) => response.json())
      .then((data) => setQuote(data));
  }, []);
  return (
          <Pane
            alignItems="center"
            marginX={majorScale(12)}
            justifyContent="center"
            style={{ textAlign: 'center' }}
          >
            <h1>Write Prose</h1>
            <div>
            {quote ? 
            <>
            <MDEditor.Markdown source={`> ${quote.en}`} />
            <div style={{ textAlign: 'right', padding: '1rem'}}>{quote.author}</div>
            </> : 
                <Spinner />
              }
            </div>
            <div className="m-8">
              <MDEditor value={value} onChange={setValue} />
              <Button style={{ width: '80%', margin: '2rem' }} appearance="primary">
                Share!
              </Button>
            </div>
          </Pane>

  )
}

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/:id" element={<View />} />
      </Routes>
    </div>
  );
}

export default App;
