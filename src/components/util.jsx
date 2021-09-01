import React from 'react';


export const playAudio =(isPlaying,audioRef) =>{
    if(isPlaying){
        const playPromise= audioRef.current.play();
        if(playPromise !== undefined){
            playPromise.then((audio)=> {
                audioRef.current.play(); // play song after it is fully loaded
            });
        }
    }
}