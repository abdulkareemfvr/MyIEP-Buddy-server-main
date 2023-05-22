const { Configuration, OpenAIApi } = require("openai");
const Accommodations = require("../../models/userData/Accommodations.model");
const UserData = require("../../models/userData/UserData.model");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const accommodationsGenerateText = async (req, res) => {
  try {
    const { prompt1, prompt2 } = req.body;

    // Generate completion for the first prompt
    const completion1 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt1,
      max_tokens: 450,
      temperature: 0,
    });

    const data1 = completion1.data.choices[0].text;

    // Generate completion for the second prompt
    const completion2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt2,
      max_tokens: 450,
      temperature: 0,
    });

    const data2 = completion2.data.choices[0].text;

    res.status(200).json({
      message: "Text generated successfully",
      data: {
        prompt1: data1,
        prompt2: data2,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crateAccommodations = async (req, res) => {
  try {
    const { id } = req.params;
    const { prompt1, prompt2, accommodations } = req.body;

    const text = await UserData.updateOne(
      { _id: id },
      {
        $set: {
          accommodations: {
            prompt1,
            prompt2,
            accommodations,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "successfully create accommodation ",
      data: text,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  accommodationsGenerateText,
  crateAccommodations,
};
