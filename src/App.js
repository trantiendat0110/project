import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'


import Home from './components/Home'
import User from './components/User'
import NavMusic from './components/NavMusic/NavMusic'
import './App.scss';


import imgCd1 from './assets/img/AmThamBenEM.png'
import imgCd2 from './assets/img/AnhsaiRoi.jpg'
import imgCd3 from './assets/img/BuocQuaMuacoDOn.jpg'
import imgCd4 from './assets/img/BuocQuaNhau.jfif'
import imgCd5 from './assets/img/HenEmkiepSau.jpg'
import imgCd6 from './assets/img/LaLung.jfif'
import imgCd7 from './assets/img/Mơ.jpg'

const ListSong =  [

  {
    img: imgCd4,
    name: "Bước Qua Nhau",
    singer: "Vũ",
   
  },
  {
    img: imgCd1,
    name: "Âm thầm bên em",
    singer: "Sơn Tùng MTP",
   
  },
  {
    img: imgCd2,
    name: "Anh sai rồi",
    singer: "Sơn Tùng MTP",
   
  },
  {
    img: imgCd3,
    name: "Bước Qua Mùa Cô Đơn",
    singer: "Vũ",
   
  },
  {
    img: imgCd5,
    name: "Hẹn Em Kiếm Sau",
    singer: "Tiến Đạt AA",
   
  },
  {
    img: imgCd6,
    name: "Lạ Lùng",
    singer: "Vũ",
   
  },
  {
    img: imgCd7,
    name: "Mơ",
    singer: "Vũ Cát Tường",
   
  }
]


function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Routes>
        <Route path='/' element={<Home ListSong={ListSong}></Home>}></Route>
        <Route path='/User' element={<User></User>}></Route>
      </Routes>
      <NavMusic ListSong={ListSong}></NavMusic>
    </div>
  );
}

export default App;
