const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagsData = await Tag.findAll();
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // ********be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
    
      include: [{ model: Product, through: Tag, as: 'tag_id' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({ where: { tag_id: req.params.tag_id } })
  .then(() => res.end())
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
});

module.exports = router;
