const express = require('express');
const Post = require('../models/posts');
const { default: mongoose } = require('mongoose');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        let post = new Post({
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        });

        await post.save(); 
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
    
});

router.put('/:id', async(req, res) => {
    try{
        let post = await Post.findById(req.params.id);
        post.title = req.body.title1;
        post.description = req.body.description1;
        post.markdown = req.body.markdown1;

        post = await post.save();
        res.redirect('/');
    }catch(error) {
        console.log(error);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const posts = await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;