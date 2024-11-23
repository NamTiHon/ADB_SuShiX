import React from 'react';
import '../css/customerinfo.css';

const TextFieldItem = ({ textfield }) => {
    return (
        <div className = 'textfield'>
            <label for={textfield.name}>{textfield.name}</label>
            <input type='text' id={textfield.name}></input>
        </div>
    );
}

const CustomerInfo = () => {
    const textfields = [
        { name: 'Họ tên: ' },
        { name: 'Địa chỉ: ' },
        { name: 'Số điện thoại: ' },
        { name: 'Ngày sinh: ' },
        { name: 'CCCD: ' },
        { name: 'Giới tính: ' },
        { name: 'Email: ' },
        { name: 'Điểm tích luỹ: ' },
        { name: 'Hạng thành viên: ' },
        { name: 'Ngày tham gia: ' }
    ]

    return (
        <div>
            <h1 className="header">Thông tin khách hàng</h1>
            <div className="info-box">
                <div className='avatar-container'>
                    <div className='avatar'>
                    </div>
                    <button className='btn-avatar'>Chọn ảnh</button>
                </div>
                <div className='textfield-area'>
                    {textfields.map((textfield, index) => (
                        <TextFieldItem key={index} textfield={textfield} />
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default CustomerInfo;