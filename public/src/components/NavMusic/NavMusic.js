import React from 'react'
import { useEffect, memo , useState, useCallback, useRef} from 'react'
import './navmusic.scss'
import song1 from '../../assets/Music/BuocQuaNhau-Vu-7120388.mp3'
import song2 from '../../assets/Music/AmThamBenEmPianoCover-AnCoong-4117631.mp3'
import song3 from '../../assets/Music/AnhSaiRoi-MTP-2647024.mp3'
import song4 from '../../assets/Music/BuocQuaMuaCoDon-Vu-6879419.mp3'
import song5 from '../../assets/Music/HenEmKiepSauOrinnRemix-LaDuyPhucTIB-6150700.mp3'
import song6 from '../../assets/Music/LaLung-Vu-4749614.mp3'
import song7 from '../../assets/Music/Mo-VuCatTuong-5958629.mp3'


const URLSong = [song1, song2, song3, song4, song5, song6, song7]
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


export default function NavMusic(props) {
    const ranger = useRef()
    const next = useRef()
    const back = useRef()


    useEffect(() => {
        const audio = $('#audio')
        const startPause = $('#start')
        const thumb = $('#thumb')
        const pInHeader = $('.header p')
        const app = {
            
          curentIndex: 0,
          isplay: true,
          
        // ///////////// Lang nghe su kien ///////////////////
            handleEvent: () => {

                setTimeout(() => {
                    audio.ontimeupdate = () => {
                        var countTime  = audio.currentTime / audio.duration  * 100
                        ranger.current.value = countTime
                    }
                    ranger.current.onchange = () => {
                        var seekTime  = ranger.current.value * audio.duration  / 100
                        audio.currentTime = seekTime
                    }
                }, 1000)


                // xu ly play and pause music
                startPause.onclick = () => {
                    if (app.isplay) {
                        app.isplay = !app.isplay
                        startPause.innerHTML = `<i class="far fa-pause-circle"></i>`
                        audio.play()
                    }
                    else {
                        app.isplay = !app.isplay
                        startPause.innerHTML = `<i class="fa fa-play-circle"></i>`
                        audio.pause()
                    }

                }
                // xử lý next song, 
                next.current.onclick = () => {
                    if (app.curentIndex === 6) {
                        app.curentIndex = 0
                        app.curentIndex--
                    }
                    app.nextSong()
                }
                // xu lý back song
                back.current.onclick = () => {
                    if (app.curentIndex === 0) {
                        app.curentIndex = 6
                        app.curentIndex++
                    }
                    app.backSong()
                }
                audio.onended = () => {
                    app.nextSong()
                }
                
            },
            nextSong: () => {
                app.curentIndex++
                app.loadCurentSong()
                audio.play()
            },
            backSong: () => {
                app.curentIndex--
                app.loadCurentSong()
                audio.play()
            },
            loadCurentSong: () => {
                pInHeader.innerText =  props.ListSong[app.curentIndex].name
                thumb.setAttribute('src', props.ListSong[app.curentIndex].img)
                audio.setAttribute('src', URLSong[app.curentIndex])
            },
            start: () => {
                // load song dau tien
                app.loadCurentSong()

                // xu ly du kien
                app.handleEvent()
            }
            
        }
        app.start()
      }, [])
    return (
        <>
            <div className="nav_home">
                <div className="main_nav_home">
                    <button id="repeat"><i className="fas fa-repeat"></i></button>
                    <button ref={back} id="back"><i className="fas fa-backward"></i></button>
                    <button id="start" className="BtnPlay"><i className="fa fa-play-circle"></i></button>
                    <button ref={next} id="next"><i className="fas fa-forward"></i></button>
                    <button className="" id="random"><i className="fas fa-random"></i></button>
                </div>
                <audio id="audio" src=""></audio>
                <input ref={ranger} id="progress" className="progress" type="range" defaultValue={0} step="0.1" min={0} max={100} />
            </div> 
        </> 
    )
}
