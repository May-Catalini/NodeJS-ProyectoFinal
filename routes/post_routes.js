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


router.get('/:slug', (req, res) => {
    Post.findOne({slug: req.params.slug})
        .then((post)=>{
            if(post){
                res.render('show', {post: post})
            } else {
                res.redirect('/')
            }
        })
});

router.put('/edit/:id', async(req, res, next) => {
    try{
        req.post = await Post.findById(req.params.id);
        next();
    }catch(error) {
        console.log(error);
    }
},
savePostAndRedirect('edit')
);

router.get('/edit/:id', async(req, res) => {
    try{
        let post = await Post.findById(req.params.id);
        res.render('edit', { post: post });
    }catch(error) {
        console.log(error);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        let post = await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

router.delete('/', (req, res) => {
    Post.deleteMany()
        .then(post => res.json(post))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

function savePostAndRedirect(path){
    return async (req, res) => {
        let post = req.post;
        post.title = req.body.title;
        post.description = req.body.description;
        post.markdown = req.body.markdown;

        try{
            post = await post.save();
            res.redirect(`/articles/${post.slug}`);
        } catch (error) {
            console.log(error);
            res.render(path, { post: post });
        }
    }
}

module.exports = router;