const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.getById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;

  const insertId = await productsService.insert(name);

  return res.status(201).json({ id: insertId, name });
};

module.exports = {
  getAll,
  getById,
  insert,
};