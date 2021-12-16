import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button, Pane, Text, Spinner, majorScale } from 'evergreen-ui';
import { Route, Router, Routes, useNavigate } from 'react-router';
import View from './View';

function Main() {
  const [value, setValue] = React.useState<any>('**Hello world!!!**');
  const [quote, setQuote] = React.useState<any>();
  const navigate = useNavigate();
  const isMounted = React.useRef(true)

  const [isSending, setIsSending] = React.useState(false)

  React.useEffect(() => { fetch('https://ji84k2mag9.execute-api.us-east-1.amazonaws.com/prod/')
      .then((response) => response.json())
      .then((data) => setQuote(data));
  }, []);

  const saveContent = React.useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    const response = await fetch('http://k8s-default-servicea-10661b8be6-224305748.us-east-1.elb.amazonaws.com/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: value
      })
    });
    const id = await response.text();
    console.log(id)
    if (isMounted.current)
      setIsSending(false)
    navigate(`/${id}`)
  }, [isSending])
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
              <Button style={{ width: '80%', margin: '2rem' }} appearance="primary" onClick={saveContent}>
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
