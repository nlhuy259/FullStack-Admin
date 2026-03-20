import bcrypt from 'bcrypt';
export const hashPasswordHelper = async (password: string) => {
	try{
		return await bcrypt.hash(password, 10);
	} catch (error) {
		throw new Error('Error hashing password');
	}
}

export const comparePasswordHelper = async (password: string, hashedPassword: string)  => {
	try {
		return await bcrypt.compare(password, hashedPassword);
	} catch (error) {
		throw new Error('Error comparing passwords');
	}
}