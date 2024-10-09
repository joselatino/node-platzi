const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products)
});

router.get('/filter', async (req, res) => {
  res.send('Soy un filter');
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await service.findOne(id);

      res.json(product)
    } catch (error) {
      next(error)
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const productUpdated = await service.update(id, body);
      res.json(productUpdated)
    } catch (error) {
      next(error)
    }

  }
)

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
  const id = req.params.id;
  const productDeleted = await service.delete(id);
  res.status(200).json({
    msg: 'deleted',
    id: productDeleted
  })
})

module.exports = router;
