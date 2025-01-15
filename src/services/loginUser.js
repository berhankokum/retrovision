import { account } from '../appwrite';

const loginUser = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        console.log('Giriş başarılı:', session);
        alert('Giriş işlemi başarılı!');
        return session;
    } catch (error) {
        console.error('Giriş hatası:', error);
        alert(`Giriş sırasında bir hata oluştu: ${error.message}`);
    }
};

export default loginUser;
