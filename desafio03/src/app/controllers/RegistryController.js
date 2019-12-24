import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Registry from '../models/Registry';
import Plan from '../models/Plan';
import Student from '../models/Student';

import NewStudentMail from '../jobs/NewStudentMail';
import Queue from '../../lib/Queue';

class RegistryController {
  async index(req, res) {
    return res.json();
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
     * Cria nova matrícula
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
      // await Mail.sendMail({
      //   to: `${student.name} <${student.email}>`,
      //   subject: 'Você possui créditos na Gympoint',
      //   template: 'newstudent',
      //   context: {
      //     student: student.name,
      //     plan: plan.title,
      //     endDate: format(end_date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
      //       locale: pt,
      //     }),
      //     price: `R$ ${price.toLocaleString('pt-BR')}`,
      //   },
      // });
    } catch (err) {
      return res.status(400).json({ error: 'Name or e-mail not found' });
    }

    return res.json(registry);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new RegistryController();
