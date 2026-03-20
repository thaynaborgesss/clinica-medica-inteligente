const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    cep: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    weatherAlert: {
      type: String,
      default: 'Sem alerta climático'
    },
    notes: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['agendada', 'confirmada', 'cancelada'],
      default: 'agendada'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
