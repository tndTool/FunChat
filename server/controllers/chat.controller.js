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
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        res.header('Access-Control-Allow-Origin', '*');
        res.json({ text: response.data.choices[0].message.content.trim() });
    } catch (err) {
        console.error('Error creating completion:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
