console.log("Welcome to Aditya's Spotify");
let songsongIndex = 0 ;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "10000 Hours" , filePath:"1.mp3" ,coverPath:"1.jpg"},
    { songName: "Gerua" , filePath:"2.mp3" ,coverPath:"2.jpg"},
    { songName: "Halmithi Habibo" , filePath:"3.mp3" ,coverPath:"3.jpg"},
    { songName: "No Competition" , filePath:"4.mp3" ,coverPath:"4.jpg"},
    { songName: "Ambarsariya" , filePath:"5.mp3" ,coverPath:"5.jpg"},
    { songName: "Ankhiyon se " , filePath:"6.mp3" ,coverPath:"6.jpg"}

    
]
songItems.forEach((element,i)=>{
    
element.getElementsByTagName("img")[0].src = songs[i].coverPath;
element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

// masterPlay.addEventListener('click' ,()=>{
//     if(audioElement.paused || audioElement.currentTime<=0){
//         audioElement.play();
//         masterPlay.classList.remove("fa-regular fa-3x fa-circle-play");
//         masterPlay.classList.add("fa-solid fa-pause");

//     }
// })
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-regular", "fa-3x", "fa-circle-play");
        masterPlay.classList.add("fa-solid","fa-3x","fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-solid","fa-3x","fa-circle-pause");
        masterPlay.classList.add("fa-regular", "fa-3x", "fa-circle-play");
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Use 'input' instead of 'change' for more immediate feedback
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});






const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
        // Reset all elements to play icon
        element.classList.remove("fa-solid", "fa-circle-pause");
        element.classList.add("fa-regular", "fa-circle-play");
    });
};

// Add event listeners to each song item play button
Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // Reset all icons to play first
        makeAllPlays();
        
        // Now update the clicked element to pause icon
        const songIndex = parseInt(e.currentTarget.id); // Use e.currentTarget to ensure you're getting the right element
        if (!isNaN(songIndex)) {
            e.currentTarget.classList.remove("fa-regular", "fa-circle-play");
            e.currentTarget.classList.add("fa-solid", "fa-circle-pause");
            masterSongName.innerText = songs[songIndex].songName ;

            // Corrected template literal usage
            audioElement.src = `${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;

            masterPlay.classList.remove("fa-solid", "fa-3x", "fa-circle-play");
            masterPlay.classList.add("fa-regular", "fa-3x", "fa-circle-pause");
        } else {
            console.error("Invalid songIndex:", e.currentTarget.id);
        }
    });
});



let songIndex = 0 ;

document.getElementById('next').addEventListener('click', () => {
    // Assuming you have 6 songs, indexed from 0 to 5
    if (songIndex >= 5) { // Change to 5 if you have 6 songs (0 to 5)
        songIndex = 0; // Reset to the first song
    } else {
        songIndex += 1; // Move to the next song
    }
    audioElement.src = `${songIndex + 1}.mp3`; // Ensure this matches your file names
    audioElement.currentTime = 0; // Reset playback time
    audioElement.play(); // Play the audio

    // Update the play button icon
    masterSongName.innerText = songs[songIndex].songName ;
    masterPlay.classList.remove("fa-solid", "fa-3x", "fa-circle-play");
    masterPlay.classList.add("fa-regular", "fa-3x", "fa-circle-pause");

    // Debugging logs
    console.log("Next song index:", songIndex);
    console.log("Audio source set to:", audioElement.src);
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) { // Check if at the first song
        songIndex = 5; // Loop back to the last song (if you have 6 songs)
    } else {
        songIndex -= 1; // Move to the previous song
    }
    audioElement.src = `${songIndex + 1}.mp3`; // Ensure this matches your file names
    audioElement.currentTime = 0; // Reset playback time
    audioElement.play(); // Play the audio

    // Update the play button icon
    masterSongName.innerText = songs[songIndex].songName ;
    masterPlay.classList.remove("fa-solid", "fa-3x", "fa-circle-play");
    masterPlay.classList.add("fa-regular", "fa-3x", "fa-circle-pause");

    // Debugging logs
    console.log("Previous song index:", songIndex);
    console.log("Audio source set to:", audioElement.src);
});


