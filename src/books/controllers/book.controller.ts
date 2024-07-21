import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import * as fs from 'fs';

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Operations related to books in the collection
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         gender:
 *           type: string
 *           description: The genre or category of the book
 *         authorId:
 *           type: integer
 *           description: The ID of the book's author
 *       required:
 *         - title
 *         - gender
 *       example:
 *         id: 1
 *         title: "The Great Gatsby"
 *         gender: "Novel"
 *         authorId: 5
 *     BookCreate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book
 *         gender:
 *           type: string
 *           description: The genre or category of the book
 *         authorId:
 *           type: integer
 *           description: The ID of the book's author
 *       required:
 *         - title
 *         - gender
 *       example:
 *         title: "The Great Gatsby"
 *         gender: "Novel"
 *         authorId: 5
 *     BookUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book
 *         gender:
 *           type: string
 *           description: The genre or category of the book
 *         authorId:
 *           type: integer
 *           description: The ID of the book's author
 *       required:
 *         - title
 *         - gender
 *       example:
 *         title: "The Great Gatsby"
 *         gender: "Novel"
 *         authorId: 5
 */

const bookService = new BookService();

export class BookController {

  /**
   * @swagger
   * /api/books:
   *   post:
   *     tags:
   *       - Books
   *     summary: Create a new book
   *     description: Adds a new book to the collection
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BookCreate'
   *     responses:
   *       201:
   *         description: Book created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const createBookDto: CreateBookDto = req.body;
      const book = await bookService.createBook(createBookDto);
      res.status(201).json({
        message: 'Book created successfully',
        data: book
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({
        message: errorMessage
      });
    }
  }
  
  /**
   * @swagger
   * /api/books:
   *   get:
   *     tags:
   *       - Books
   *     summary: Retrieve a list of books
   *     description: Fetches all books in the collection
   *     responses:
   *       200:
   *         description: A list of books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Book'
   *       500:
   *         description: Internal server error
   */
  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await bookService.getAllBooks();
      res.status(200).json({
        message: 'Books fetched successfully',
        data: books
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ 
        message: errorMessage
       });
    }
  }

  /**
   * @swagger
   * /api/books/{id}:
   *   get:
   *     tags:
   *       - Books
   *     summary: Retrieve a book by ID
   *     description: Fetches a single book by its unique identifier
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Book details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       404:
   *         description: Book not found
   *       500:
   *         description: Internal server error
   */
  async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const bookId = parseInt(req.params.id, 10);
      const book = await bookService.getBookById(bookId);
      if (book) {
        res.status(200).json({
          message: 'Book fetched successfully',
          data: book
        });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  /**
   * @swagger
   * /api/books/{id}:
   *   put:
   *     tags:
   *       - Books
   *     summary: Update a book by ID
   *     description: Updates the details of a book specified by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BookUpdate'
   *     responses:
   *       200:
   *         description: Book updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       400:
   *         description: Invalid input
   *       404:
   *         description: Book not found
   *       500:
   *         description: Internal server error
   */
  async updateBook(req: Request, res: Response): Promise<void> {
    try {
      const bookId = parseInt(req.params.id, 10);
      const updateBookDto: UpdateBookDto = req.body;
      const updateBook = await bookService.updateBook(bookId, updateBookDto);
      res.status(200).json({
        message: 'Book updated successfully',
        data: updateBook
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ 
        message: errorMessage
       });
    }
  }

  /**
   * @swagger
   * /api/books/{id}:
   *   delete:
   *     tags:
   *       - Books
   *     summary: Delete a book by ID
   *     description: Removes a book from the collection by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Book deleted successfully
   *       404:
   *         description: Book not found
   *       500:
   *         description: Internal server error
   */
  async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const bookId = parseInt(req.params.id, 10);
      const book = await bookService.deleteBook(bookId);
      res.status(204).json({ 
        message: 'Book deleted successfully',
        data: book
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ 
        message: errorMessage
       });
    }
  }


  /**
   * @swagger
   * /api/books/export/xlsx:
   *   get:
   *     tags:
   *       - Books
   *     summary: Export books to XLSX file
   *     description: Generates an XLSX file containing all books and returns it as a download
   *     responses:
   *       200:
   *         description: XLSX file of books
   *         content:
   *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
   *             schema:
   *               type: string
   *               format: binary
   *       500:
   *         description: Internal server error
   */
  async exportBooks(req: Request, res: Response): Promise<void> {
    try {
      const filePath = await bookService.exportBooksToXlsx();

      res.download(filePath, 'books.xlsx', (err) => {
        if (err) {
          console.error('Error while sending the file:', err);
          res.status(500).json({ message: 'Error while sending the file' });
        }

        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error while deleting the file:', unlinkErr);
          }
        });
      });
    } catch (error) {
      console.error('Error exporting books:', error);
      res.status(500).json({ message: 'Failed to export books' });
    }
  }
}