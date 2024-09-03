import axios from 'axios';
import { useState } from 'react';

// const baseUrl = 'https://salmon-mushroom-0fa83ac0f.5.azurestaticapps.net/api/';

const AzureFunctionCaller = () => {
  const [response, setResponse] = useState<string | null>(null);

  const callFunction = async () => {
    const response = await axios.get('/HelloWorld');
    setResponse(response.data);
  };

  return (
    <div>
      <button onClick={callFunction}>Call Function</button>
      <p>{JSON.stringify(response)}</p>
    </div>
  );
};

export default AzureFunctionCaller;
