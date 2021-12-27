import React from 'react'
import './User.scss'
export default function User() {
    return (
        <div id='user'>
            <h3>Hello Again!</h3>
            <p>Đăng Nhập</p>
            <div className='input'>
                <input placeholder='Enter userName'></input>
                <input placeholder='PassWord'></input>
            </div>
            <h4>Lấy lại mật khẩu</h4>
            <a className='sign' href='/'>Sign In</a>
            <h5>Tiếp tục với !</h5>
            <div className='link'>
                <a href='/'><i style={{color: '#334fdb'}} class="fab fa-facebook"></i></a>
                <a href='/'><i style={{color: 'brown'}} class="fab fa-google"></i></a>
                <a href='/'><i style={{color: '#333'}} class="fab fa-apple"></i></a>
            </div>
            <p>Không có tài khoản <a href='/' style={{color: 'red'}}>đăng lý ở đây</a></p>
        </div>
    )
}
