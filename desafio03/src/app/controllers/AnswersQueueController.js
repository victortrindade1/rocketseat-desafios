import HelpOrder from '../models/HelpOrder';

class AnswersQueueController {
  async index(req, res) {
    const answersQueue = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(answersQueue);
  }
}

export default new AnswersQueueController();
