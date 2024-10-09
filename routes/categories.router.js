const express = require('express')
const router = express.Router()

router.get('/:categoryId/products/:productId',(req, res)=>{
  const {categoryId,productId} = req.params
  res.json(
    {
      categoryId,
      productId,
      name: `Product ${productId} of category ${categoryId}`,
      price: 100
    }
  )

})

module.exports = router
