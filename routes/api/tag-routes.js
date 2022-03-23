const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const dbTagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          as: 'product_tag_id',
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: {
            attributes: [],
            // where: {completed: true}
          }
        }
      ]
    })
    res.json(dbTagData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const dbTagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          as: 'product_tag_id',
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: {
            attributes: []
          }
        }
      ]
    })
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id ' })
      return
    }
    res.json(dbTagData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const dbPostData = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(dbPostData)
  } catch (err) {
    console.log(err)
    res.json(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const dbPostData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!dbPostData[0]) {
      res.status(404).json({ message: 'No tag found with this id' })
      return
    }
    res.json(dbPostData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const dbPostData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!dbPostData) {
      res.status(404).json({ message: 'No tag found with this id' })
      return
    }
    res.json(dbPostData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
