const express = require('express')
const mongoose = require('mongoose')

const Post = require('../models/Post')

//get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()

        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//get post by id
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//add a post
const addPost = async(req, res) => {
    const { title, text, image } = req.body;

    const newPost= new Post({
        title,
        text,
        image
    })

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//update a post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, text, image  } = req.body;

    const postFields = {};
    if(title){
        postFields.title = title;
    }
    if(text){
        postFields.text = text;
    }
    if(image){
        postFields.image = image;
    }
    
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('Post not found')
    }


    post = await Post.findByIdAndUpdate(id,
            { $set: postFields },
            { new: true });

    res.json(post);
}

//delete a post
const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('Post not found')
    };

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted" });
}

module.exports = {
    addPost: addPost,
    getPosts: getPosts,
    getPost: getPost,
    updatePost: updatePost,
    deletePost: deletePost
};