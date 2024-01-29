import bcrypt from 'bcrypt'

export const encodePw = (pw, time) => {
    return bcrypt.hashSync(pw, time)
} 

export const checkPw = (pw, encodePw) => {
    return bcrypt.compareSync(pw, encodePw)
}