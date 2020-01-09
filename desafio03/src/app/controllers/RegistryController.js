import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Registry from '../models/Registry';
import Plan from '../models/Plan';
import Student from '../models/Student';

import NewStudentMail from '../jobs/NewStudentMail';
import AddCreditsMail from '../jobs/AddCreditsMail';
import Queue from '../../lib/Queue';

class RegistryController {
  async index(req, res) {
    const registries = await Registry.findAll({
      where: {
        canceled_at: null,
        end_date: {
          [Op.gt]: new Date(), // end_date > today
        },
      },

      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
      ],
    });

    return res.json(registries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /**
     * Calculate end_date
     */
    const plan = await Plan.findByPk(plan_id);

    const end_date = addMonths(parseISO(start_date), plan.duration);

    /**
     * Calculate price
     */
    const price = plan.price * plan.duration;

    /**
     * Find student
     */
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    /**
     * Create new registry
     */
    const registry = await Registry.create({
      start_date,
      end_date,
      student_id,
      plan_id,
      price,
    });

    /**
     * Send e-mail to student
     */
    try {
      await Queue.add(NewStudentMail.key, {
        student,
        plan,
        end_date,
        price,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Name or e-mail not found' });
    }

    return res.json(registry);
  }

  async update(req, res) {
    /**
     * Ao efetuar o pagamento, é dado o start date e plan, então é recalculado o
     * end_date e price. Também é enviado um e-mail de atualização dos créditos na
     * academia. Desta forma, cada aluno possuirá apenas 1 registry (matrícula)
     */
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      plan_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date, plan_id } = req.body;
    const { id } = req.params;

    const registry = await Registry.findByPk(id);

    if (!registry || registry.canceled_at !== null) {
      return res.status(400).json({ error: 'Registry not found' });
    }

    /**
     * Calculate new end_date
     */
    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);

    /**
     * Calculate new price
     */
    const price = plan.price * plan.duration;

    /**
     * Update registry with new price, start_date and end_date
     */
    const editedRegistry = await registry.update({
      start_date,
      end_date,
      price,
      plan_id,
    });

    /**
     * Find student
     */
    const student = await Student.findByPk(registry.student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    /**
     * Send e-mail to student
     */
    try {
      await Queue.add(AddCreditsMail.key, {
        student,
        plan,
        end_date,
        price,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Name or e-mail not found' });
    }

    return res.json(editedRegistry);
  }

  async delete(req, res) {
    const { id } = req.params;

    // Verifica se plano existe e se já não foi cancelado
    const registry = await Registry.findByPk(id);

    if (!registry || registry.canceled_at !== null) {
      return res.status(400).json({ error: 'Registry not found' });
    }

    registry.canceled_at = new Date();

    await registry.save();

    return res.json(registry);
  }
}

export default new RegistryController();
