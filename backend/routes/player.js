const express = require('express');
const router = express.Router();
const { Player } = require('../models');
const { authorize } = require('../src/auth');
const { check, validationResult } = require('express-validator');
const { only } = require('../src/utils');
const { Op } = require('sequelize');

// Get all players
router.get('/', async (req, res) => {
  const players = await Player.findAll({
    scope: { method: ['accessLevel', req.user?.role] }
  });
  res.json(players);
});

// Get one player
router.get('/id/:id', async (req, res) => {
  const player = await Player.findByPk(req.params.id, {
    scope: { method: ['accessLevel', req.user?.role] }
  }
  );
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ success: false, code: 'not-found' });
  }
});

// Create one player
router.post('/', authorize("admin"), [
  check('firstName').optional().notEmpty().withMessage('required'),
  check('lastName').notEmpty().withMessage('required'),
  check('birthdate').optional().isDate().withMessage('not-valid-date'),
  check('federationId').optional().isNumeric().withMessage('not-valid-number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, code: "validation-error", errors: errors.array() });
  }

  const player = await Player.create(only(req.body, [
    'firstName', 'lastName', 'birthdate', 'federationId'
  ]));
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
    return res.status(400).json({ success: false, code: "validation-error", errors: errors.array() });
  }

  const player = await Player.findByPk(req.params.id);
  if (player) {
    const data = only(req.body, [
      'firstName', 'lastName', 'birthdate', 'federationId'
    ]);
    console.log(data)
    await player.update(data);
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

router.post('/delete', authorize("admin"), [
  check('ids').isArray().withMessage('not-an-array'),
  check('ids.*').isNumeric().withMessage('not-a-number')
], async (req, res) => {
  const result = await Player.destroy({ where: { id: req.body.ids } });
  res.json({ success: true, result });
});


async function search(q, idExact = false) {
  let query = {};
  if (q.includes(" "))
    query = {
      fullName: { [Op.like]: `${q.replace(' ', '%')}%` }
    }
  else
    query = {
      [Op.or]: [
        { firstName: { [Op.like]: `${q}%` } },
        { lastName: { [Op.like]: `${q}%` } },
        { federationId: { [Op.like]:  idExact ? q : `${q}%` } },
      ]
    }
  const players = await Player.findAll({
    where: query,
    limit: 10
  });
  const firstChar = q.charAt(0)
  if (firstChar >= '0' && firstChar <= '9')
    players.sort((a, b) => a.federationId - b.federationId)  // When we search by federation ID, we prefer exact search, which is the lowest number

  return players;
}




router.get('/search', authorize("admin"),
  async (req, res) => {
    const players = await search(req.query.q);
    res.json(players);
  });

router.post('/search', authorize("admin"),
  check('queries').isArray().withMessage('required'),
  check('queries.*').isString().withMessage('required'),
  async (req, res) => {
    const searches = req.body.queries.map(q => search(q, true));
    const players = await Promise.all(searches)
    res.json(players);
  });



router.post('/import', authorize("admin"), [
  check('importName').notEmpty().withMessage('required'),
  check('players.*.firstName').optional().notEmpty().withMessage('required'),
  check('players.*.lastName').notEmpty().withMessage('required'),
  check('players.*.birthdate').optional().isDate().withMessage('not-valid-date'),
  check('players.*.federationId').optional().isNumeric().withMessage('not-valid-number')
], async (req, res) => {
  const players = req.body.players;
  const importName = req.body.importName;

  const result = await Player.bulkCreate(players, { validate: true });
  res.json({ success: true, result });
})

module.exports = router;
