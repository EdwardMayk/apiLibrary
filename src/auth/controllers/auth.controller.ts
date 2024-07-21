import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { ErrorMessages } from "../enum/error-messages.enum";

const authService = new AuthService();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "password123"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         role:
 *           type: string
 *           example: "author"
 *       required:
 *         - email
 *         - password
 * 
 *     LoginUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "password123"
 *       required:
 *         - email
 *         - password
 * 
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "12345"
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         role:
 *           type: string
 *           example: "user"
 *       required:
 *         - id
 *         - email
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "User logged in"
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: JWT token
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

export class AuthController {
    
    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     tags: [Auth]
     *     summary: Register a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterUserDto'
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "User created successfully"
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */
    async register(req: Request, res: Response) {
        try {
            const dto: RegisterUserDto = req.body;
            const user = await authService.register(dto);
            res.status(201).json({ 
                message: "User created successfully",
                data: user
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : ErrorMessages.INTERNAL_SERVER_ERROR;
            res.status(500).json({ message: errorMessage });
        }
    }
    
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     tags: [Auth]
     *     summary: Login a user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginUserDto'
     *     responses:
     *       200:
     *         description: User logged in successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthResponse'
     *       500:
     *         description: Internal server error
     */
    async login(req: Request, res: Response) {
        try {
            const dto: LoginUserDto = req.body;
            const user = await authService.login(dto);
            res.status(200).json({
                message: "User logged in",
                data: user
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : ErrorMessages.INTERNAL_SERVER_ERROR;
            res.status(500).json({ message: errorMessage });
        }
    }
}