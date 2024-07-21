import { Request, Response } from "express";
import { UserService } from '../services/user.service';
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/updat-user.dto";
import * as fs from 'fs';

const userService = new UserService();

export class UserController {
    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: User management
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     CreateUserDto:
     *       type: object
     *       properties:
     *         email:
     *           type: string
     *           format: email
     *           description: The email of the user
     *         password:
     *           type: string
     *           minLength: 6
     *           description: The password of the user, with a minimum length of 6 characters
     *         name:
     *           type: string
     *           description: The name of the user (optional)
     *         username:
     *           type: string
     *           description: The username of the user (optional)
     *         role:
     *           type: string
     *           description: The role of the user (optional)
     *       required:
     *         - email
     *         - password
     *       example:
     *         email: "john.doe@example.com"
     *         password: "securepassword"
     *         name: "John Doe"
     *         username: "john_doe"
     *         role: "user"
     *     UpdateUserDto:
     *       type: object
     *       properties:
     *         email:
     *           type: string
     *           format: email
     *           description: The email of the user (optional)
     *         password:
     *           type: string
     *           minLength: 6
     *           description: The password of the user (optional, should be at least 6 characters long)
     *         name:
     *           type: string
     *           description: The name of the user (optional)
     *         username:
     *           type: string
     *           description: The username of the user (optional)
     *         role:
     *           type: string
     *           description: The role of the user (optional)
     *       example:
     *         email: "john.doe@example.com"
     *         password: "newsecurepassword"
     *         name: "John Doe"
     *         username: "john_doe"
     *         role: "admin"
     */



    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Retrieve all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Users fetched successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Users fetched successfully
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({
                message: 'Users fetched successfully',
                data: users
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    /**
     * @swagger
     * /api/users/{email}:
     *   get:
     *     summary: Retrieve a user by email
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: email
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User fetched successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */
    async findUserByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const user = await userService.findUserByEmail(email);
            res.status(200).json({
                message: 'User fetched successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */
    async createUser(req: Request, res: Response) {
        try {
            const dto: CreateUserDto = req.body;
            const newUser = await userService.createUser(dto);
            res.status(201).json({
                message: 'User created successfully',
                data: newUser
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    /**
     * @swagger
     * /api/users/update/{id}:
     *   put:
     *     summary: Update an existing user
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUserDto'
     *     responses:
     *       200:
     *         description: User updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */
    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const dto: UpdateUserDto = req.body;
            const updatedUser = await userService.updateUser(id, dto);
            res.status(200).json({
                message: 'User updated',
                data: updatedUser
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     summary: Delete a user
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */
    async deleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deletedUser = await userService.deleteUser(id);
            res.status(200).json({
                message: 'User deleted successfully',
                data: deletedUser
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }


    /**
     * @swagger
     * /api/users/authorsBooks/export/xlsx:
     *   get:
     *     tags:
     *       - AuthorsBooks
     *     summary: Export authorsBooks to XLSX file
     *     description: Generates an XLSX file containing all authorsBooks and returns it as a download
     *     responses:
     *       200:
     *         description: XLSX file of authorsBooks
     *         content:
     *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
     *             schema:
     *               type: string
     *               format: binary
     *       500:
     *         description: Internal server error
     */
    async exportAuthorsBooks(req: Request, res: Response) {
        try {
          const filePath = await userService.exportBookAuthorsToXlsx();
          res.download(filePath, 'books-authors.xlsx', (err) => {
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

