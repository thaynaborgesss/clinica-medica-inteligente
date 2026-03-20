const { getAddressByCep } = require('../services/cepService');
const { getWeatherAlert } = require('../services/weatherService');

exports.getAddress = async (req, res) => {
  try {
    const { cep } = req.params;

    const address = await getAddressByCep(cep);

    res.status(200).json({ address });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao consultar CEP.', error: error.message });
  }
};

exports.getWeather = async (req, res) => {
  try {
    const { date } = req.params;

    const weatherAlert = await getWeatherAlert(date);

    res.status(200).json({ weatherAlert });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao consultar clima.', error: error.message });
  }
};
