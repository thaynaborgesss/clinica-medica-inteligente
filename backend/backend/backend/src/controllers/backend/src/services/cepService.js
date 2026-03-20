const axios = require('axios');

exports.getAddressByCep = async (cep) => {
  const sanitizedCep = cep.replace(/\D/g, '');

  const response = await axios.get(`https://viacep.com.br/ws/${sanitizedCep}/json/`);

  if (response.data.erro) {
    throw new Error('CEP não encontrado.');
  }

  const { logradouro, bairro, localidade, uf } = response.data;

  return `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
};
