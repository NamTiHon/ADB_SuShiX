import { billService } from '../services/billService.js';

export const getBills = async (req, res) => {
    try {
        const bills = await billService.getAllBills();
        res.status(200).json({ message: 'Bills fetched successfully', data: bills });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bills', error: error.message });
    }
};

// Lấy hóa đơn theo số điện thoại khách hàng
export const getBillsByCustomer = async (req, res) => {
    const { SDT_KH } = req.params;
    try {
        const bills = await billService.getBillsByCustomer(SDT_KH);
        res.status(200).json({ message: 'Bills fetched successfully', data: bills });
    } catch (error) {
        console.error('Error fetching bills by customer:', error);
        res.status(500).json({ message: 'Failed to fetch bills', error: error.message });
    }
};

// Lấy hóa đơn theo ngày
export const getBillsByDate = async (req, res) => {
    const { ThoiGianDat } = req.params;
    try {
        const bills = await billService.getBillsByDate(ThoiGianDat);
        res.status(200).json({ message: 'Bills fetched successfully', data: bills });
    } catch (error) {
        console.error('Error fetching bills by date:', error);
        res.status(500).json({ message: 'Failed to fetch bills', error: error.message });
    }
};

export const getBillById = async (req, res) => {
    try {
        const bill = await billService.getBillById(req.params.billId);
        if (!bill) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json({ message: 'Bill fetched successfully', data: bill });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bill', error: error.message });
    }
};

// Tạo hóa đơn
export const createBill = async (req, res) => {
    const { MaHoaDon, SoTienGiam, TongTruocGiam, MaPhieu } = req.body;
    try {
        const result = await billService.createBill({ MaHoaDon, SoTienGiam, TongTruocGiam, MaPhieu });
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({ message: 'Failed to create bill', error: error.message });
    }
};

export const updateBill = async (req, res) => {
    try {
        const updatedBill = await billService.updateBill(req.params.billId, req.body);
        if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json({ message: 'Bill updated successfully', data: updatedBill });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update bill', error: error.message });
    }
};

export const deleteBill = async (req, res) => {
    try {
        const deleted = await billService.deleteBill(req.params.billId);
        if (!deleted) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete bill', error: error.message });
    }
};
