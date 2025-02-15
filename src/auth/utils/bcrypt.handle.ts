import { compare, hash } from 'bcryptjs';

const encrypt = async (pass: string) => {
    const passwordHash = await hash(pass, 8);
    return passwordHash;
}

const verify = (pass: string, passHash: string) => {
    const isCorrect = compare(pass, passHash);
    return isCorrect;
}

export {
    encrypt,
    verify
}