import bcrypt, { genSaltSync } from 'bcrypt';

const saltRounds=10;


export const hashPassword = (password) => {
    const salt=bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password,salt);
}

export const comparePassword= (password,hash) => {
    const result=bcrypt.compareSync(password,hash);
    return result;
}