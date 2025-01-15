import { account } from '../appwrite';

const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        alert('Çıkış işlemi başarılı!');
    } catch (error) {
        console.error('Çıkış hatası:', error);
        alert(`Çıkış sırasında bir hata oluştu: ${error.message}`);
    }
};

export default logoutUser;
