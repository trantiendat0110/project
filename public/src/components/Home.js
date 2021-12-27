import Music from "./Music/Music"

function Home(props) {

    return (
        <div id='home'>
            <Music ListSong={props.ListSong}></Music>
        </div>
    )
}
export default Home