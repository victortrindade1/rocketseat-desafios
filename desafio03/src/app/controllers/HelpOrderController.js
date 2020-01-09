import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    const request = {
      student_id: req.params.student_id,
    };

    if (!(await schema.isValid(request))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: request.student_id,
      },

      attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
      student_id: Yup.number().required(),
    });

    const request = {
      question: req.body.question,
      student_id: req.params.student_id,
    };

    if (!(await schema.isValid(request))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(request.student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const { question } = req.body;

    /**
     * Create new help order
     */
    const helpOrder = await HelpOrder.create({
      student_id: request.student_id,
      question,
    });

    return res.json(helpOrder);
  }

  async update(req, res) {
    // Only admin users are able to update
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
      id: Yup.number().required(),
    });

    const { id } = req.params;
    const { answer } = req.body;

    if (
      !(await schema.isValid({
        id,
        answer,
      }))
    ) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order not found' });
    }

    if (helpOrder.answer !== null) {
      return res.status(400).json({ error: 'Answer already done' });
    }

    /**
     * Find student
     */
    const student = await Student.findByPk(helpOrder.student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const answerOrder = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    /**
     * Send e-mail to student
     */
    try {
      await Queue.add(HelpOrderMail.key, {
        student,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: helpOrder.answer_at,
      });
    } catch (err) {
      return res.status(400).json({ error: 'E-mail not sent' });
    }

    return res.json(answerOrder);
  }
}

export default new HelpOrderController();
