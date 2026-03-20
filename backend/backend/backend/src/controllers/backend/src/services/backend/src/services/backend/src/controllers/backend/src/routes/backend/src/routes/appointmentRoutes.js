const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment
} = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', authMiddleware, createAppointment);
router.get('/', authMiddleware, getAppointments);
router.put('/:id/status', authMiddleware, updateAppointmentStatus);
router.delete('/:id', authMiddleware, deleteAppointment);

module.exports = router;
