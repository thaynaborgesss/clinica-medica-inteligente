# clinica-medica-inteligente

# Sistema de Atendimento Inteligente para Clínicas Médicas

## Descrição
Este projeto consiste em uma aplicação web desenvolvida para informatizar o processo de agendamento de consultas em clínicas médicas de pequeno porte.

A aplicação permite:
- Cadastro e login seguro de usuários (pacientes e secretários)
- Agendamento de consultas com validação de horário disponível
- Consulta automática de endereço via CEP
- Verificação de previsão de chuva no dia da consulta
- Painel administrativo para gerenciamento dos atendimentos

## Tecnologias Utilizadas

### Frontend
- Vue.js 3
- Vue Router
- Axios
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Axios
- dotenv
- cors

## Funcionalidades
- Cadastro de usuários
- Login com autenticação JWT
- Proteção de rotas
- Agendamento de consultas
- Validação de horários ocupados
- Consulta de endereço via ViaCEP
- Consulta de clima via OpenWeatherMap
- Painel de gerenciamento de agendamentos

## Estrutura do Projeto
```bash
clinica-medica-inteligente/
├── backend/
├── frontend/
├── README.md
