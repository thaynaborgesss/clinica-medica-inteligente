const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const { date, time, cep, address, weatherAlert, notes } = req.body;

    const existingAppointment = await Appointment.findOne({
      date,
      time,
      status: { $ne: 'cancelada' }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Horário já está ocupado.' });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      date,
      time,
      cep,
      address,
      weatherAlert,
      notes
    });

    res.status(201).json({
      message: 'Consulta agendada com sucesso!',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento.', error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'secretario') {
      appointments = await Appointment.find()
        .populate('patient', 'name email role')
        .sort({ createdAt: -1 });
    } else {
      appointments = await Appointment.find({ patient: req.user.id })
        .populate('patient', 'name email role')
        .sort({ createdAt: -1 });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar agendamentos.', error: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    if (req.user.role !== 'secretario') {
      return res.status(403).json({ message: 'Apenas secretários podem alterar status.' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: 'Status atualizado com sucesso!',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status.', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    const isOwner = appointment.patient.toString() === req.user.id;
    const isSecretary = req.user.role === 'secretario';

    if (!isOwner && !isSecretary) {
      return res.status(403).json({ message: 'Sem permissão para excluir este agendamento.' });
    }

    await Appointment.findByIdAndDelete(id);

    res.status(200).json({ message: 'Agendamento removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover agendamento.', error: error.message });
  }
};
