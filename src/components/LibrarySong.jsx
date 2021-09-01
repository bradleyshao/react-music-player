import React from 'react';
import { playAudio } from '../components/util';

const LibrarySong =({song,songs,setCurrentSong,id,audioRef,isPlaying,setSongs,currentSong})=>{
    const songSelectHandler = async()=>{
        //const selectedSong = songs.filter((state)=> state.id === id);
        await setCurrentSong(song);

        await setSongs(songs.map((song)=>{
            if(song.id === currentSong.id){
                return{...song,active:true,}; //返回object song，保持song中其他部分不变，active变为true。
            }else{
                return({...song,active:false,});
            }
        }));
        
       if(isPlaying){
                    audioRef.current.play();
                }

    };
    return(
        <div className={`library-song ${song.id === currentSong.id ? 'selected':""}`}  onClick={songSelectHandler}>
            <img alt={song.name}src={song.cover}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;