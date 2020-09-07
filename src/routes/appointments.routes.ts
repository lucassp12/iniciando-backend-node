import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import CreateAppointmentsService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';

import ensureAuthenticated from '../middlewares/ensureAunthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentRepository.find();

  return response.json(appointments);

});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentsService();
  const appointment = await createAppointment.execute({ provider_id, date: parsedDate });


  return response.json(appointment);
});



export default appointmentsRouter;
