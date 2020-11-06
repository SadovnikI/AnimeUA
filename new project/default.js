var player = DM.player(document.getElementById("player"),{ 
    video: "x7tgad0", 
    width: "100%", 
    height: "100%", 
    params: { 
        autoplay: true, 
        mute: true 
    } 
}); 

player.addEventListener('apiready', function(){
    console.log('Player API ready');
  });