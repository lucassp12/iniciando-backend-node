import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

import AppError from '../errors/AppErros';

interface Request {
  email: string,
  password: string,
};

interface Response {
  user: User;
  token: string
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMathched = await compare(password, user.password);

    if (!passwordMathched) {
      throw new Error("Incorrect email/password combination.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn
    });

    return {
      user,
      token
    }

  }
}

export default AuthenticateUserService;
