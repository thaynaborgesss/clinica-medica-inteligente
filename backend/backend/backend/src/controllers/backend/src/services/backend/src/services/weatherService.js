const axios = require('axios');

exports.getWeatherAlert = async (date) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return 'API de clima não configurada.';
    }

    // Exemplo simples usando coordenadas fixas do Rio de Janeiro
    const lat = -22.9068;
    const lon = -43.1729;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`
    );

    const target = response.data.list.find((item) => item.dt_txt.startsWith(date));

    if (!target) {
      return 'Previsão indisponível para a data selecionada.';
    }

    const hasRain = target.weather.some((w) =>
      w.description.toLowerCase().includes('chuva')
    );

    return hasRain
      ? 'Atenção: há previsão de chuva para o dia da consulta.'
      : 'Sem previsão de chuva para o dia da consulta.';
  } catch (error) {
    return 'Não foi possível consultar o clima no momento.';
  }
};
