const { Book, Author } = require("../model/model");

const bookController = {
    // ADD A BOOK
    addABook: async (req, res) => {
        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            if (req.body.author) {
                const author = Author.findById(req.body.author);
                await author.updateOne({ $push: { books: savedBook._id } });
            }
            res.status(200).json(savedBook);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET ALL BOOK
    getAllBooks: async (req, res) => {
        try {
            const allBooks = await Book.find();
            res.status(200).json(allBooks);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET A BOOK
    getABook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate("author");
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE BOOK
    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({ $set: req.body });
            res.status(200).json("Updated Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // DELETE A BOOK
    deleteBook: async (req, res) => {
        try {
            await Author.updateMany(
                { books: req.params.id }, // trong tac gia tim quyen sach can xoa
                { $pull: { books: req.params.id } } // lay quyen sach do ra khoi tac gia, dùng pull vì là array
            );
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = { bookController };
