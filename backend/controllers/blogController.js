import express from "express";
import mongoose from "mongoose";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// GET ALLL THE BLOGS FROM DB
export const getAllBlog = async(req, res) => {
    let blogs;

    try{
        blogs = await Blog.find()
        // .populate("User");
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }

// IF THE DATA ON DB IT WILL  GET 
    if(!blogs) {
        res.status(404).json({
            message: "Atlas!!! No Blog Found"
        });
    }
    else{
        res.status(200).json({
            message: "Blogs fetched successfully",
            data: blogs
        });
    }
};

// ADD A NEW BLOG T DB
export const addBlogs = async (req, res) => {
    const { title, description, image, newUser } = req.body;

    let newUserExists;
    try{
        newUserExists = await User.findById(newUser);
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }
    
    if(!newUserExists) {
        res.status(400).json({
            message: "Atlas!!! Unable to find  ById"
        });
    }

    const blog = new Blog({
        title,
        description,
        image,
        newUser
    });

// IF THE BLOG ADDED SUCCESSFULLY GIVE  MESSAGE
    try {
        // await blog.save();
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        newUserExists.blogs.push(blog);
        await newUserExists.save({ session });
        await session.commitTransaction();

        res.status(200).json({
            message: "Blogs added successfully",
            data: blog
        })
    }
    catch(error) {
        // console.log(`Error: ${error}`);
        res.status(500).json({
            Error: error
        });
    }
};

// UPDATE THE BLOG ON DB
export const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }

// GIVE THE MESSAGE FOR UPDATED SUCCESSFUL
    if(!blog) {
        res.status(500).json({
            message: "Unable to update blog"
        });
    }
    else {
        res.status(200).json({
            message: "Updated blog successfully",
            data: blog
        });
    }
};

// GET THE PERTICULAR DATA BY ID
export const getBlogById = async (req, res) => {
    const blogId = req.params.id;
    let blogById;
    try {
        blogById =await Blog.findById(blogId);
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }

// IF CAN FETCH THE BLOG FROM DB GIVE MESSSAGE
    if(!blogById) {
        res.status(404).json({
            message: "Atlas!!! Couldn't fetch the blog"
        });
    }
    else {
        res.status(200).json({
            message: "Blog fetched successfully",
            data: blogById
        });
    }
};

// DELETE THE BLOG  ON DB BYID
export const deleteBlogById = async (req, res) => {
    const blogId = req.params.id;
    let deleteBlog;
    try {
        deleteBlog = await Blog.findByIdAndRemove(blogId)
        // .populate('newUser');
        // await deleteBlog.newUser.blog.pull(deleteBlog);
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }

// IF THE BLOG DETELE SUCCESSFUL GIVE A MESSAGE FOR CONFIRM
    if(!deleteBlog) {
        res.status(500).json({
            message: "Atlas!!! could not delete the blog"
        });
    }
    else{
        res.status(200).json({
            message: "Blog deleted successfully"
        });
    }
};

// GET SINGLE USER BLOG FROM DB
export const getUserById = async(req, res) => {
    const UserId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(UserId)
            .populate("blogs");
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }

    if(!userBlogs) {
        res.status(404).json({
            message: "Atlas!!! User not found",
        });
    }
    else {
        res.status(200).json({
            message: "Data fetched successfully",
            data: userBlogs
        });
    }
};