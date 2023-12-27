const express = require('express');
const router = express.Router();
const {Tournament} = require('../models');
const { authorize } = require('../src/auth');
const { check, validationResult } = require('express-validator');


// Get all tournaments
router.get('/',  async (req, res) => {
  const tournaments = await Tournament.findAll();
  res.json(tournaments);
});

// Get one tournament
router.get('/:id', async (req, res) => {
  const tournament = await Tournament.findByPk(req.params.id);
  if (tournament) {
    res.json(tournament);
  } else {
    res.status(404).json({ message: 'Cannot find tournament' });
  }
});

// Create one tournament
router.post('/', authorize("admin"),
[
  check('title').notEmpty().withMessage('required'),
  check('startDate').isDate().withMessage('not-valid-date'),
  check('endDate').optional().isDate().withMessage('not-valid-date'),
  check('place').optional(),
  check('description').optional(),
  check('externalDocumentationLink').optional().isURL().withMessage('not-valid-url')
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const tournament = await Tournament.create(req.body);
  res.status(201).json(tournament);
});

// Update one tournament
router.patch('/:id', authorize("admin"),[
  check('title').optional().notEmpty().withMessage('required'),
  check('startDate').optional().isDate().withMessage('not-valid-date'),
  check('endDate').optional().isDate().withMessage('not-valid-date'),
  check('place').optional(),
  check('description').optional(),
  check('externalDocumentationLink').optional().isURL().withMessage('not-valid-url')
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const tournament = await Tournament.findByPk(req.params.id);
  if (tournament) {
    await tournament.update(req.body);
    res.json(tournament);
  } else {
    res.status(404).json({ message: 'Cannot find tournament' });
  }
});

// Delete one tournament
router.delete('/:id', authorize("admin"), async (req, res) => {
  const tournament = await Tournament.findByPk(req.params.id);
  if (tournament) {
    await tournament.destroy();
    res.json({ message: 'Deleted Tournament' });
  } else {
    res.status(404).json({ message: 'Cannot find tournament' });
  }
});

module.exports = router;