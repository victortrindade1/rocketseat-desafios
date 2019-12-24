import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      where: { canceled_at: null },
      // Os campos q eu quero q mostre ficam em "attributes"
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Validation: plan exists
    const planExists = await Plan.findOne({
      where: {
        title: req.body.title,
        canceled_at: {
          $ne: null,
        },
      },
    });

    if (planExists) {
      return res.status(400).json({ error: 'This plan already exists.' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    // Se editar plano, verifica se o novo plano já possui nome existente
    if (req.body.title) {
      const { title } = req.body;

      const titleExists = await Plan.findOne({
        where: { title },
      });

      if (titleExists) {
        return res.status(400).json({ error: 'Title already exists.' });
      }
    }

    const editedPlan = await plan.update(req.body);

    return res.json(editedPlan);
  }

  async delete(req, res) {
    const { id } = req.params;

    // Verifica se plano existe e se já não foi cancelado
    const plan = await Plan.findByPk(id);

    if (!plan || plan.canceled_at !== null) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    plan.canceled_at = new Date();

    await plan.save();

    return res.json(plan);
  }
}

export default new PlanController();
