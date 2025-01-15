import { account } from '../appwrite';

const registerUser = async (email, password, name) => {
    try {
        const response = await account.create(
            'unique()', // Benzersiz bir userId oluşturur
            email,      // Kullanıcının e-posta adresi
            password,   // Kullanıcının şifresi
            name        // Kullanıcının adı
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
