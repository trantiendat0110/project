const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const header = $('.header h2')
const nameSong = $('.header p')
const imgSong = $('#thumb')
const audio = $('#audio')
const cdImg = $('.cd img')
const progress = $('#progress')
const nextSong = $('#next')
const backSong = $('#back')
const randomBtn = $('#random')
const repeatBtn = $('#repeat')
const navBar_home = $('.navBar_home')
const elementHome = $('#main_home')
const elementMusic = $('#main-music')

var a = 1;
const app = {
  navbar: false,
  btnRepeat: false,
  onUpBtnRandom: false, 
  currentIndex: 0,
  songs: [
  
    {
      name: "Bước Qua Nhau",
      singer: "Vũ",
      path: "./assets/Music/BuocQuaNhau-Vu-7120388.mp3",
      img: "./assets/img/BuocQuaNhau.jfif"
    },
    {
      name: "Âm thầm bên em",
      singer: "Sơn Tùng MTP",
      path: "./assets/Music/AmThamBenEmPianoCover-AnCoong-4117631.mp3",
      img: "./assets/img/AmThamBenEM.png"
    },
    {
      name: "Anh sai rồi",
      singer: "Sơn Tùng MTP",
      path: "./assets/Music/AnhSaiRoi-MTP-2647024.mp3",
      img: "./assets/img/AnhsaiRoi.jpg"
    },
    {
      name: "Bước Qua Mùa Cô Đơn",
      singer: "Vũ",
      path: "./assets/Music/BuocQuaMuaCoDon-Vu-6879419.mp3",
      img: "./assets/img/BuocQuaMuacoDOn.jpg"
    },
    {
      name: "Hẹn Em Kiếm Sau",
      singer: "Tiến Đạt AA",
      path: "./assets/Music/HenEmKiepSauOrinnRemix-LaDuyPhucTIB-6150700.mp3",
      img: "./assets/img/HenEmkiepSau.jpg"
    },
    {
      name: "Lạ Lùng",
      singer: "Vũ",
      path: "./assets/Music/LaLung-Vu-4749614.mp3",
      img: "./assets/img/LaLung.jfif"
    },
    {
      name: "Mơ",
      singer: "Vũ Cát Tường",
      path: "./assets/Music/Mo-VuCatTuong-5958629.mp3",
      img: "./assets/img/Mơ.jpg"
    }
    

  ],
  renDer: () => { 
    const playList = $('#playList')
    const htmls = app.songs.map((song, index) => {
      return `
      <div class="main-list ${index === app.currentIndex ? 'active_list' : ''}">
        <img src="${song.img}" alt="">
        <div class="title">
            <h4>${song.name}</h4>
            <p>${song.singer}</p>
        </div>
      </div>`
    })
    const html = htmls.join('')
    playList.innerHTML = html
  },
  definePropertys: () => {
    Object.defineProperty(app, 'currentSong', {
      get: function () {
        return app.songs[this.currentIndex]
      }
    })
  },
  handleEvent: () => {
    // sử lý trượt màn hình
    const cdImgWidth = cdImg.offsetWidth
    document.onscroll = () => {
      const scroll = document.documentElement.scrollTop || window.scrollY
      const newWidthCd = cdImgWidth - scroll
      const opacity = newWidthCd / cdImgWidth

      cdImg.style.width = newWidthCd > 0 ? newWidthCd + 'px' : 0
      cdImg.style.opacity = opacity ;
    }
    //  xử lý CD quay và dừng 
      const imgSongAnimate  = cdImg.animate([
        { transform: 'rotate(360deg)' }
      ],
      { duration: 10000,
        iterations: Infinity
      })
      imgSongAnimate.pause()
    // xử lý click phát và dừng
    const startBtn = $('#start')
    var count = 0;
    function startPause() {
      if (count == 0) {
        count = 1;
        startBtn.innerHTML = `<i class="far fa-stop-circle">`
        audio.play()
        imgSongAnimate.play()

      }
      else {
        count = 0;
        startBtn.innerHTML = `<i class="far fa-play-circle"></i>`
        audio.pause()
        imgSongAnimate.pause()

      }
    }
    startBtn.onclick = () => {
      startPause()
    }
    //  xử lý tiến độ khi phát
    audio.ontimeupdate = () => {
      var countSong = audio.currentTime / audio.duration * 100
      progress.value  = countSong
    }
    //  xử lý khi tua bài hát
    progress.onchange = (e) => {
      const seekTime = audio.duration  * progress.value / 100 
      audio.currentTime = seekTime
    } 
    // xử lý sự kiện next song 
    nextSong.onclick = (e) => {
      if (app.onUpBtnRandom) {
        app.playRandomSong()
      }
      else {
        app.nextSong()
      }
      app.renDer()
      app.scrollIntoView()
      
    }
    backSong.onclick = (e) => {
      if (app.onUpBtnRandom) {
        app.playRandomSong()
      }
      else {
        app.backSong()
      }
      app.renDer()
      app.scrollIntoView()


    }
    // xử lý khi hết bài
    audio.onended = () => {
      if (app.onUpBtnRandom) {
        app.playRandomSong()
        audio.play()
      }
      else if (!app.onUpBtnRandom && !app.btnRepeat) {
        app.nextSong()
      }
      else if (app.btnRepeat) {
        app.playRepeatSong()
      }
      else if (!app.btnRepeat && !app.onUpBtnRandom) {
        app.nextSong()
      }
    }
    // xử lý btn random songs
    randomBtn.onclick = (e) => {
      app.randomBtn();

    }
    // xử lý btn lặp lại song
    repeatBtn.onclick = () => {
      app.repeatBtn()
    }
    // xu ly xu kien phat bai hat khi click vao bai hat do
    app.activeSong()
    
  },
  activeSong: () => {
    const elementSong = $$('.main-list')
    elementSong.forEach((song, index) => {
      song.onclick = (e) => {
        $('.active_list').classList.remove('active_list')
        song.classList.add('active_list')
        app.playWhenClicked(song, index)
        audio.play()
      }
    })
  },
  playWhenClicked: (song, ind) => {
    app.currentIndex = ind
    app.loadCurrentSong()
  },
  playRepeatSong: () => {
    audio.play()
  },
  playRandomSong: () => {
    let newIndex 
    do {
      newIndex = Math.floor(Math.random() * app.songs.length);
    }while(newIndex == app.currentIndex)
    app.currentIndex = newIndex
    app.loadCurrentSong()
  },
  repeatBtn : () => {
    app.btnRepeat = !app.btnRepeat
    repeatBtn.classList.toggle('active', app.btnRepeat)
  },
  randomBtn: () => {
      app.onUpBtnRandom = !app.onUpBtnRandom
      randomBtn.classList.toggle('active', app.onUpBtnRandom)
  },
  backSong: () => {
    app.currentIndex--;
    app.loadCurrentSong()
    audio.play()
  },
  nextSong: () => {
    app.currentIndex++;
    if (app.currentIndex >= app.songs.length) {
        app.currentIndex = 0
    }
    app.loadCurrentSong()
    audio.play()

  },
  loadCurrentSong: () => {
    nameSong.textContent = app.currentSong.name
    imgSong.setAttribute('src', app.currentSong.img)
    audio.src = app.currentSong.path
  },
  scrollIntoView: () => {
    setTimeout(() => {
      var ElementActive = $('.active_list')
      // console.log(ElementActive)
      ElementActive.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"});
    })
  },

  start:  () => {
    // interFace app
    // upLoad playlist 
    app.renDer()

    // định nghĩa thuộc tính 
    app.definePropertys()

    // load song đầu tiên 
    app.loadCurrentSong()

    // SỬ lý sự kiện
    app.handleEvent()

    // interFace home

    // load songlist 
    home.renDer()
    
    // // xử lý sự kiện
    home.handleEventHome()
  },
}
const home = {
  
  renDer: () => {
    const elementLove = $('.home_list_scorses')
    const htmls = app.songs.map((song, index) => {
      return `
      <div class="home_list_scorse">
        <img src="${song.img}" alt="">
        <h4 style="color: crimson;">${song.name}</h4>
        <p>${song.singer}</p>
      </div>
      `
    })
    const html = htmls.join('')
    elementLove.innerHTML = html
  },
  handleEventHome: () =>{
    // xử lý click list home
    const iconList = $("#iconList")
    iconList.onclick = () => {
      home.openNavbar()
    }
    // xử lý click back home
    const iconBackList = $('#iconBackList')
    const iconBackHome = $('#iconBackHome')
    iconBackList.onclick = () => {
      home.closeNavbar() 
    }
    iconBackHome.onclick = () => {
      home.closeNavbar() 
    }
    // xử lý chuyển qua nghe nhạc
    const iconMusic = $('#iconMusic')
    iconMusic.onclick = () => {
      home.openInterFaceMusic()
    }
    // xử lý quay về home
    const elementBackHome = $('#backHome')
    elementBackHome.onclick = () => {
      console.log(1)
      home.closeInterFaceMusic()
    }
  },
  closeInterFaceMusic: () => {
    elementHome.classList.add('open')
    elementHome.classList.remove('close')
    elementMusic.classList.add('close')
    elementMusic.classList.remove('open')
  },
  openInterFaceMusic: () => {
    elementHome.classList.add('close')
    elementHome.classList.remove('open')
    elementMusic.classList.add('open')
    elementMusic.classList.remove('close')
  },
  openNavbar: () => {
    navBar_home.classList.remove('close')
    navBar_home.classList.add('open')
  },
  closeNavbar: () => {
    navBar_home.classList.remove('open')
    navBar_home.classList.add('close')
  }

}
app.start();

