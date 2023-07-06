import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors";

const ensureUserExistsMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);

    const userId: string = req.params.id;

    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(userId)) {
        throw new AppError("Invalid user UUID", 400);
    }

    const user: User | null = await userRepository.findOne({
        where: {
            id: userId,
        }
    })

    if (!user) {
        throw new AppError("User not found", 404);
    }

    req.foundById = user;
    return next();
}

export { ensureUserExistsMiddleware }