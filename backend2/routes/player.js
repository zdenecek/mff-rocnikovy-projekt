const express = require('express');
const router = express.Router();
const { Player } = require('../models');
const { authorize } = require('../src/auth');
const { check, validationResult } = require('express-validator');

// Get all players
router.get('/', async (req, res) => {
  const players = await Player.findAll();
  res.json(players);
});

// Get one player
router.get('/:id', async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ success: false, code: 'not-found' });
  }
});

// Create one player
router.post('/', authorize("admin"), [
  check('firstName').notEmpty().withMessage('required'),
  check('lastName').notEmpty().withMessage('required'),
  check('birthdate').isDate().withMessage('not-valid-date'),
  check('federationId').isNumeric().withMessage('not-valid-number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success:false, code:"validation-error", errors: errors.array() });
  }

  const player = await Player.create(req.body);
  res.status(201).json(player);
});

// Update one player
router.patch('/:id', authorize("admin"), [
  check('firstName').optional().notEmpty().withMessage('required'),
  check('lastName').optional().notEmpty().withMessage('required'),
  check('birthdate').optional().isDate().withMessage('not-valid-date'),
  check('federationId').optional().isNumeric().withMessage('not-valid-number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success:false, code:"validation-error", errors: errors.array() });
  }

  const player = await Player.findByPk(req.params.id);
  if (player) {
    await player.update(req.body);
    res.json({ success: true, player });
  } else {
    res.status(404).json({ success: false, code: 'not-found' });
  }
});

// Delete one player
router.delete('/:id', authorize("admin"), async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (player) {
    await player.destroy();
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, code: 'not-found' });
  }
});

module.exports = router;
