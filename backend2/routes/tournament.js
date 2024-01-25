const express = require('express');
const router = express.Router();
const { Tournament, Result, Player } = require('../models');
const { authorize } = require('../src/auth');
const { check, validationResult } = require('express-validator');
const Sequelize = require('sequelize');


const resultValidators = [
  check('results.*.scoreAchieved').isNumeric().withMessage('not-valid-number'),
  check('results.*.players').isArray().withMessage('not-valid-array'),
  check('results.*.players.*.id').optional().isNumeric().withMessage('not-valid-number'),
  check('results.*.players.*.type').optional().isIn(['create']).withMessage('not-valid-type'),
  check('results.*.unitName').optional().notEmpty().withMessage('required'),
  check('results.*.players.*').custom((player) => {
    if (player.type === 'create' && !player.lastName) {
      throw new Error('last-name-required');
    }
    return true;
  }),
]

// Get all tournaments
router.get('/', async (req, res) => {
  const tournaments = await Tournament.findAll({
    include: [{
      model: Result,
      attributes: [], // Exclude Result attributes from the final output
      as: 'results',
    }],
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col("results.id")), 'resultsCount']]
    },
    group: ['Tournament.id']
  });
  res.json(tournaments);
});

// Get one tournament
router.get('/:id', async (req, res) => {
  const tournament = await Tournament.findByPk(req.params.id, {
    include: [
      {
        model: Result,
        as: 'results',
        attributes: { exclude: ['tournamentId'] }, // exclude fields from the Child model
        include: {
          model: Player,
          as: 'players',
          through: { attributes: [] },
          attributes: { exclude: ['birthdate', 'createdAt', 'updatedAt'] } // exclude fields from the Child model
        }
      }
    ]
  });
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
    check('results').optional().isArray().withMessage('not-valid-array'),
    check('externalDocumentationLink').optional().isURL().withMessage('not-valid-url')
  ], resultValidators
  , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, code: "validation-error", errors: errors.array() });
    }

    const { results, ...tournamentData } = req.body;
    const tournament = await Tournament.create(tournamentData, { include: ['results'] });

    if (results) {
      for (const resultData of results) {
        const { players, ...resultInfo } = resultData;
        const result = await Result.create(resultInfo);

        for (const playerData of players) {
          let player;
          if (playerData.type === 'create') {
            player = await Player.create(playerData);
          } else {
            player = await Player.findByPk(playerData.id);
          }

          if (player) {
            const unit = await Unit.create({ name: player.lastName });
            await unit.setPlayer(player);
            await result.setUnit(unit);
          }
        }

        await tournament.addResult(result);
      }
    }


    res.status(201).json(tournament);
  });

// Update one tournament
router.patch('/:id', authorize("admin"), [
  check('title').optional().notEmpty().withMessage('required'),
  check('startDate').optional().isDate().withMessage('not-valid-date'),
  check('endDate').optional().isDate().withMessage('not-valid-date'),
  check('place').optional(),
  check('description').optional(),
  check('externalDocumentationLink').optional().isURL().withMessage('not-valid-url'),

], resultValidators, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, code: "validation-error", errors: errors.array() });
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