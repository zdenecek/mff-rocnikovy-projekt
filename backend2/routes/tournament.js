const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const { authorize } = require('../src/auth');

// Get all tournaments
router.get('/', authorize(), async (req, res) => {
  const tournaments = await Tournament.findAll();
  res.json(tournaments);
});

// Get one tournament
router.get('/:id', authorize(), async (req, res) => {
  const tournament = await Tournament.findByPk(req.params.id);
  if (tournament) {
    res.json(tournament);
  } else {
    res.status(404).json({ message: 'Cannot find tournament' });
  }
});

// Create one tournament
router.post('/', authorize(), async (req, res) => {
  const tournament = await Tournament.create(req.body);
  res.status(201).json(tournament);
});

// Update one tournament
router.patch('/:id', authorize(), async (req, res) => {
  const tournament = await Tournament.findByPk(req.params.id);
  if (tournament) {
    await tournament.update(req.body);
    res.json(tournament);
  } else {
    res.status(404).json({ message: 'Cannot find tournament' });
  }
});

// Delete one tournament
router.delete('/:id', authorize(), async (req, res) => {
  const tournament = await Tournament.findByPk(req.params.id);
  if (tournament) {
    await tournament.destroy();
    res.json({ message: 'Deleted Tournament' });
  } else {
    res.status(404).json({ message: 'Cannot find tournament' });
  }
});

module.exports = router;