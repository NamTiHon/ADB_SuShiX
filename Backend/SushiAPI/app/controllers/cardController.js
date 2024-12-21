import cardService from '../services/cardService.js';

export const register = async (req, res) => {
    const { MaThe, NgayTao, LoaiThe, SDT_KH, MaNhanVien } = req.body;
    console.log(req.body);
    try {
        const result = await cardService.register(MaThe, NgayTao, LoaiThe, SDT_KH, MaNhanVien);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.status(201).json({ message: 'User created successfully', user: result.user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};