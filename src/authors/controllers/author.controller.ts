import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import * as fs from 'fs';

const authorService = new AuthorService();

    /**
     * @swagger
     * tags:
     *   - name: Authors
     *     description: Operations related to authors
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     Author:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *           description: The author ID
     *           readOnly: true  # Indica que el ID es solo lectura y no debe ser proporcionado en la creación
     *         name:
     *           type: string
     *           description: The author's name
     *         lastname:
     *           type: string
     *           description: The author's lastname
     *         specialization:
     *           type: string
     *           description: The author's specialization
     *       required:
     *         - name
     *         - lastname
     *         - specialization
     *     AuthorUpdate:
     *       type: object
     *       properties:
     *         name:
     *           type: string
     *           description: The author's name
     *         lastname:
     *           type: string
     *           description: The author's lastname
     *         specialization:
     *           type: string
     *           description: The author's specialization
     *       required:
     *         - name
     *         - lastname
     *         - specialization
     */
export class AuthorController {
    /**
     * @swagger
     * /api/authors:
     *   get:
     *     tags: [Authors]
     *     summary: Retrieve a list of authors
     *     responses:
     *       200:
     *         description: A list of authors
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Author'
     */
    async getAllAuthors(req: Request, res: Response) {
        try {
            const authors = await authorService.getAllAuthors();
            res.status(200).json({
                message: 'Authors fetched successfully',
                data: authors
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    /**
     * @swagger
     * /api/authors:
     *   post:
     *     tags: [Authors]
     *     summary: Create a new author
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The author's name
     *               lastname:
     *                 type: string
     *                 description: The author's lastname
     *               specialization:
     *                 type: string
     *                 description: The author's specialization
     *             required:
     *               - name
     *               - lastname
     *               - specialization
     *     responses:
     *       201:
     *         description: Author created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Author'
     *       400:
     *         description: Invalid input
     *       500:
     *         description: Internal server error
     */
    async createAuthor(req: Request, res: Response) {
        try {
            const dto = req.body;
            const author = await authorService.createAuthor(dto);
            res.status(201).json({
                message: 'Author created successfully',
                data: author
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    /**
     * @swagger
     * /api/authors/{id}:
     *   get:
     *     tags: [Authors]
     *     summary: Retrieve an author by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Author details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Author'
     *       404:
     *         description: Author not found
     *       500:
     *         description: Internal server error
     */
    async getAuthorById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({
                    message: 'Invalid ID format'
                });
                return;
            }

            const author = await authorService.getAuthorById(Number(id));
            if (author) {
                res.status(200).json({
                    message: 'Author fetched successfully',
                    data: author
                });
            } else {
                res.status(404).json({
                    message: 'Author not found'
                });
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Internal server error';
            res.status(500).json({
                message: errorMessage,
            });
        }
    }

    /**
     * @swagger
     * /api/authors/{id}:
     *   put:
     *     tags: [Authors]
     *     summary: Update an author by ID
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
     *             $ref: '#/components/schemas/AuthorUpdate'
     *     responses:
     *       200:
     *         description: Author updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Author'
     *       400:
     *         description: Invalid input
     *       404:
     *         description: Author not found
     *       500:
     *         description: Internal server error
     */
    async updateAuthor(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({
                    message: 'Invalid ID format'
                });
                return;
            }

            const dto = req.body;
            const author = await authorService.updateAuthor(Number(id), dto);
            if (author) {
                res.status(200).json({
                    message: 'Author updated successfully',
                    data: author
                });
            }else {
                res.status(404).json({
                    message: 'Author not found'
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Internal server error';
            res.status(404).json({ 
                message: errorMessage
            });
        }
    }

    /**
     * @swagger
     * /api/authors/{id}:
     *   delete:
     *     tags: [Authors]
     *     summary: Delete an author by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Author deleted successfully
     *       404:
     *         description: Author not found
     *       500:
     *         description: Internal server error
     */
    async deleteAuthor(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({
                    message: 'Invalid ID format'
                });
                return;
            }
            const author = await authorService.deleteAuthor(Number(id));
            if (author) {
                res.status(200).json({
                    message: 'Author deleted successfully',
                    data: author
                });
            }else {
                res.status(404).json({
                    message: 'Author not found'
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Internal server error';
            res.status(500).json({ 
                message: errorMessage
             });
        }
    }

    /**
     * @swagger
     * /api/authors/export/xlsx:
     *   get:
     *     tags:
     *       - Authors
     *     summary: Export authors to XLSX file
     *     description: Generates an XLSX file containing all authors and returns it as a download
     *     responses:
     *       200:
     *         description: XLSX file of authors
     *         content:
     *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
     *             schema:
     *               type: string
     *               format: binary
     *       500:
     *         description: Internal server error
     */
    async exportAuthors(req: Request, res: Response) {
        try {
        const filePath = await authorService.exportAuthorsToXlsx();
        res.download(filePath, 'authors.xlsx', (err) => {
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
        res.status(500).json({ message: error });
        }
    }
}