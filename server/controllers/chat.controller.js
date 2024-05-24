import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const chatCompletion = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }

        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
            temperature: 0.7,
            max_tokens: 1500,
        });

        res.header('Access-Control-Allow-Origin', '*');
        res.json({ text: response.data.choices[0].message.content.trim() });
    } catch (err) {
        console.error('Error creating completion:', err);
        res.status(500).json({ message: 'ChatGPT API key has expired' });
    }
};
