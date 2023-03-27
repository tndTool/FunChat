import { Configuration, OpenAIApi } from 'openai';

const OPENAI_API_KEY = process.env.CHATGPT_API || '<your-key-here>';

const openAIConfig = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openapi = new OpenAIApi(openAIConfig);

export const chatCompletion = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            throw new Error('Prompt is required');
        }

        const answer = await openapi.createCompletion({
            model: 'text-davinci-003',
            prompt,
            temperature: 0,
            max_tokens: 3000,
        });

        res.header('Access-Control-Allow-Origin', '*');
        res.json({ text: answer.data.choices[0].text });
    } catch (err) {
        if (err.message === 'Prompt is required') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
