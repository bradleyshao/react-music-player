import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleDoubleLeft,faAngleDoubleRight,faPause } from '@fortawesome/free-solid-svg-icons';
//import { playAudio } from '../components/util';


const Player =({currentSong,isPlaying,setIsPlaying,audioRef,songInfo,setSongInfo , songs ,setCurrentSong})=>{

    const playSongHandler =()=>{
        //console.log(audioRef.current); //选取audioRef返回值中的current元素
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }  
   
    const getTime =(time)=>{
        return(
            Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
        );
    }

    const dragHandler =(e)=>{
        setSongInfo({...songInfo,currentTime:e.target.value});
        audioRef.current.currentTime = e.target.value;
    };

    const skipTrackerHandler = async (direction) =>{
        let currentIndex = songs.findIndex((song)=> song.id === currentSong.id);
        if(direction === 'skip-forward'){
           await setCurrentSong(songs[(currentIndex+1) % songs.length]);
            
        }
        if(direction === 'skip-back'){
            if(currentIndex === 0){
               await setCurrentSong(songs[songs.length-1]);
                if(isPlaying){
                    audioRef.current.play();
                }
                return;
            }
            await setCurrentSong(songs[(currentIndex-1) % songs.length]); 
        }
        
        if(isPlaying){
            audioRef.current.play();
        }

    };

    return(
        <div className="player-container">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                
                    <input 
                        type= "range" 
                        min={0} 
                        max={songInfo.duration} 
                        value ={songInfo.currentTime}
                        onChange= {dragHandler}
                    />
                  
                {/* check if the duration info is loaded or available, if not show "0:00" */}
                <p>{songInfo.duration? getTime(songInfo.duration) : "0:00"}</p> 
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" onClick={()=>skipTrackerHandler('skip-back')} size="2x" icon={faAngleDoubleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying? faPause:faPlay}/>
                <FontAwesomeIcon className="skip-forward" onClick={()=>skipTrackerHandler('skip-forward')} size="2x" icon={faAngleDoubleRight}/>
            </div>
            
        </div>
    );
};

export default Player;