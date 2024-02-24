

const passport = require("passport");
const router = require("express").Router();
module.exports = router;
const { authorize } = require( '../src/auth');

router.use(authorize());

router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: err });
        }

        const perPage = 20;

        const pageCount = Math.ceil(users.length / perPage);
        const total = users.length;
        let page = parseInt(req.query.p);
        if (!page) { page = 1; }
        if (page > pageCount) {
            page = pageCount
        }
        const usersWithoutPassword = users;

        res.json({
            success: true,
            page: page,
            pageCount: pageCount,
            total: total,
            users: usersWithoutPassword.slice(page * perPage - perPage, page * perPage)
        });


    });
});


router.post('/users', authorize(), (req, res) => {

    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let username = email;
    if (req.body.username) {
        username = req.body.username;
    }

    const user = new User({ name, email, username, role, passwordHash: null });

    user.save(function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: err });
        }
        return res.json({ success: true });
    })
});

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: err });
        }
        return res.json({ success: true });
    })
});


router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let username = email;
    if (req.body.username) {
        username = req.body.username;
    }

    User.findByIdAndUpdate(id, { name, email, username, role }, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: err });
        }
        return res.json({ success: true });
    })
});


