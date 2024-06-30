import Openai from 'openai';

const ai = async (request, response) => {
  const data = {quantity, gender, theme} = request.body;
  const openai = new Openai({
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
      temperature: 0.5,
    });
    const namesObject = JSON.parse(completion.choices[0].message.content);
    const namesArray = namesObject.names;
    // const namesList = namesArray.map(
    //   (name,i) => <li key={i}>{name}</li>);
    // setAiResponse(namesList);
  } catch (error) {
    console.log(error);
    const status = parseErrorStatus(error);
    response.status(status).json(error);
  } 
};

const parseErrorStatus = (error) => {
  //Will need to change these:
  switch (error?.msg) {
    case 'Name not found':
      return 404;
    case 'Invalid name fields':
    case 'Name already exists':
      return 422;
    default:
      return 500;
  }
};

module.exports = {ai}