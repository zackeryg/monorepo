import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button, Pane, Text, majorScale } from 'evergreen-ui';

function App() {
  const [value, setValue] = React.useState<any>("**Hello world!!!**");
  return (
    <div className="container mx-auto">
      <Pane alignItems="center" marginX={majorScale(12)} justifyContent="center" style={{ textAlign: 'center'}}>
        <h1>
          Write Prose
        </h1>
        <div className="m-8">
          <MDEditor value={value} onChange={setValue} />
          <Button style={{ width: '80%', margin: '2rem' }} appearance="primary">Share!</Button>
        </div>
      </Pane>
    </div>
  );
}

export default App;
