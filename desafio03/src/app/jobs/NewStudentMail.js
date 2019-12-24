import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NewStudentMail {
  // With get, you don't call NewStudentMail.key(). Instead, NewStudentMail.key
  get key() {
    return 'NewStudentMail';
  }

  async handle({ data }) {
    const { student, plan, end_date, price } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Você possui créditos na Gympoint',
      template: 'newstudent',
      context: {
        student: student.name,
        plan: plan.title,
        endDate: format(
          parseISO(end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: `R$ ${price.toLocaleString('pt-BR')}`,
      },
    });
  }
}

export default new NewStudentMail();
