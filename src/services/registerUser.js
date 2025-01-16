import { account } from '../appwrite';

const registerUser = async (email, password, name) => {
    try {
        const response = await account.create(
            'unique()', 
            email,    
            password,   
            name       
        );

        console.log('Kayıt başarılı:', response);
        alert('Kayıt işlemi başarılı!');
        return response;
    } catch (error) {
        console.error('Kayıt hatası:', error);
        alert(`Kayıt sırasında bir hata oluştu: ${error.message}`);
    }
};

export default registerUser;
