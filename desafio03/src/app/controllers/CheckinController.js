import * as Yup from 'yup';
import { Op } from 'sequelize';
import subDays from 'date-fns/subDays';

import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const student_id = req.params.id;

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },

      attributes: ['id', 'student_id', 'created_at'],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    /**
     * The student is forbidden to enter if visit more then 5 times a week
     */
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.body;

    /**
     * Count times student gone in last week
     */
    const dayLastWeek = subDays(new Date(), 7);

    const checkinsLastWeek = await Checkin.count({
      where: {
        student_id,
        created_at: {
          [Op.gt]: dayLastWeek,
        },
      },
    });

    if (checkinsLastWeek >= 5) {
      return res
        .status(400)
        .json({ error: 'You exceeded your gympass for this week!' });
    }

    /**
     * Create new checkin
     */
    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
