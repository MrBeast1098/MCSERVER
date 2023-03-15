const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/gpt', async (req, res) => {
  const { message } = req.body;
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  const prompt = `I am an AI language model created by OpenAI. My task is to provide a single coherent response to each user input. Please remember this while interpreting the following message.\n\nUser: ${message}\nGPT: `;

  const maxTokens = 100;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: maxTokens,
        n: 1,
        stop: null,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching GPT response' });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
