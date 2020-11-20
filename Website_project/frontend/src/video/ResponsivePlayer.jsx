import React from 'react'
import ReactPlayer from 'react-player'
import './responsive-player.css'

const ResponsivePlayer = () => {
    

    return (
     
        /*<div className='player-wrapper'>*/
          <ReactPlayer
            //ref={this.ref}
            url='https://www.youtube.com/watch?v=6c2NqDyxppU'
            className='react-player'
            playing
            controls
            width='50%'
            height='55%'

            //onProgress={this.handleProgress}
          />
       // </div>
     
     
    )
  
    
}
export default ResponsivePlayer;

//https://projectvideobacket.s3.amazonaws.com/testvideo%20%281%29.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVK5MRPWLEKRQ3MUX%2F20201112%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20201112T133304Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=33839ea0371910df80a8fb3cd0485344086dc44cadc9270763ab181cbd637151