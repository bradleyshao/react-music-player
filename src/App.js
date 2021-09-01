import React,{useState,useRef} from 'react';
import "./styles/app.scss";
import Player from './components/Player';
import Song from './components/Songs';
import "./styles/app.scss";
import data from "./data"
import Library from './components/Library';
import Nav from "./components/Nav"


function App() {
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]); //use the first song in the state as default song
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef= useRef(null);

   //State of song info: current time and the length of the song
   const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
   });

  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler =(e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration || 0;
    //console.log(duration);
    setSongInfo({...songInfo,currentTime:current, duration:duration});
  };

  const songEndHandler = async()=>{
    let currentIndex = songs.findIndex((song)=> song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex+1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus? "library-active":""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong = {currentSong}/>
      <Player 
        currentSong = {currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        audioRef ={audioRef}
        songInfo = {songInfo}
        setSongInfo = {setSongInfo}
        songs={songs}
        setCurrentSong = {setCurrentSong}
      />
      <Library 
        audioRef={audioRef} 
        songs={songs} 
        setCurrentSong={setCurrentSong}  
        isPlaying={isPlaying} 
        setSongs={setSongs} 
        currentSong = {currentSong}
        libraryStatus={libraryStatus}
      />
      <audio 
        ref ={audioRef} 
        src={currentSong.audio} 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler}
        onEnded = {songEndHandler}
      />
    </div>
    
  );
}

export default App;
