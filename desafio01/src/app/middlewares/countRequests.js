export default async (req, res, next) => {
  console.count(`Número de requisições`);

  return next();
};
