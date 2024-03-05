    import express from 'express';
    import mongoose from 'mongoose';
    import { Book } from '../models/bookmodel.js';


    const router = express.Router();
    //routes
    router.post("/", async (req,res) => {
        try{
            if(
                !req.body.title ||
                !req.body.author||
                !req.body.publishYear
            ) {
                return res.status(400).send({
                    message: 'send all requierd fields: title, autjor, publishYear',
                });
            }
            const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            };
            const book = await Book.create(newBook);
            return res.status(201).send(book);
        }catch(error){
            console.log(error.message);
            res.status(500).send({message:error.message});
        }
    });

    //get all book from database
    router.get('/', async (req,res) => {
        try{
            const books = await Book.find({});

            return res.status(200).json({
                count: books.length,
                data: books
            });
        } catch(error){
            console.log(error.message);
            res.status(500).send({message: error.message});

        }
    });

    //get one book from database finde by id
  // Route for Get One Book from database by id
  router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        console.log('Received ID:', id);
        const book = await Book.findById(id);
    
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



    // update a books
   // Route for Update a Book
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

    //delet book
    router.delete('/:_id', async (req,res) => {
        try{
            const { _id } = req.params;
            
            const result = await Book.findByIdAndDelete(_id);
            if(!result){
                return res.status(404).json({message:'book not found'});
            }
            return res.status(200).send({message:'book successfully Deleted'});
            
        } catch(error){
            console.log(error.message);
            res.status(500).send({message: error.message});

        }
    });

    export { router }; // named export
