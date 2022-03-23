const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const dbCategoryData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
    res.json(dbCategoryData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const dbCategoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id ' })
      return
    }
    res.json(dbCategoryData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const dbPostData = await Category.create({
      category_name: req.body.category_name
    })
    res.json(dbPostData)
  } catch (err) {
    console.log(err)
    res.json(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const dbPostData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!dbPostData[0]) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }
    res.json(dbPostData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const dbPostData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!dbPostData) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }
    res.json(dbPostData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
