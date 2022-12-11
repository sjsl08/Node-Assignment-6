const router = require('express').Router();
const Blog = require('../models/Blog')
const body_parser = require('body-parser');
// const { routes } = require('../app');

router.use(body_parser.json())
// Your routing code goes here

//? first route  {GET}

router.get('/blog', async (req, res) => {

    try {
        const { page, search } = req.query
        const regex = new RegExp(search, "g")
        const result = await Blog.find({ topic: { $regex: regex } }).limit(parseInt(page))

        res.json({
            status: "success",
            result: result
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            result: e.message
        })
        console.log(e.message);
    }

})


//? second route  {POST}

router.post('/blog', async (req, res) => {
    try {
        const result = await Blog.create(req.body)
        console.log(result);

        res.json({
            status: "success",
            result: result
        }
        )

    } catch (e) {
        res.status(400).json({
            status: "failed",
            result: e.message
        })
        console.log(e.message);
    }
})

//? third route  {PUT}

router.put('/blog/:id', async (req, res) => {

    let result = req.body

    console.log(req.body);

    const { id } = req.params

    try {
        await Blog.replaceOne({ _id: id }, result)
        result = await Blog.find({ _id: id })
        if (result.length) {

            res.json({
                status: "success",
                result: result
            })

        } else {

            res.json({
                status: "Failed",
                result: "Id Does Not Exists"
            })

        }
    } catch (e) {
        res.status(400).json({
            status: "failed",
            result: e.message
        })
        console.log(e.message);
    }

})

//? forth route {DELETE}

router.delete('/blog/:id', async (req, res) => {

    const { id } = req.params
    console.log(req.params);
    try {
        const result = await Blog.find({ _id: id })
        await Blog.deleteOne({ _id: id })
        if (result.length) {

            res.json({
                status: "success",
                result: result
            })
        } else {
            
            res.json({
                status: "Failed",
                result: "Id Does Not Exists"
            })

        }
    } catch (e) {
        res.status(400).json({
            status: "failed",
            result: e.message
        })
        console.log(e.message);
    }
})


//? fifth route  {BASE}
router.get('/blog', (req, res) => {
    res.json({ ok: 'blog' })
})


module.exports = router;