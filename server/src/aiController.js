const OpenAI = require('openai');

const ai = async (request, response) => {
  const { theme, quantity, gender } = request.body;
  const openai = new OpenAI({
    organization: `${process.env.ORG_KEY}`,
    apiKey: `${process.env.OPENAI_KEY}`,
    dangerouslyAllowBrowser: true,
  });

  try {
    const result = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a creative assistant who generates creative and unique pet names.
            Return the response as a JSON object with a key of names and the values in an array object.`,
        },
        {
          role: 'user',
          content: `create ${quantity} random ${gender} pet names with a ${theme} theme.  
          Return ${quantity} pet names.
          Return only the names.  
          Never return a same name from the previous response.
          Never return more than five names.
          If the theme is not words return a value of null`,
        },
      ],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
      max_tokens: 75,
      temperature: 0.9,
    });
    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    const status = parseErrorStatus(error);
    response.status(status).json(error);
  }
};

const parseErrorStatus = (error) => {
  switch (error?.msg) {
    case 'Rate limit reached for requests':
    case 'You exceeded your current quota, please check your plan and billing details':
      return 429;
    case 'The engine is currently overloaded, please try again later':
      return 503;
    default:
      return 500;
  }
};

module.exports = { ai };
