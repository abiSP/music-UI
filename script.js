// Enhanced Music Player Script

// Playlist and current song index
let currentSongIndex = 0;
const playlist = [
    {
        title: 'Song 1',
        artist: 'Artist 1',
        albumCover: 'C:\Users\abirami\OneDrive\Documents\PROJECT\internship music\mu.1.jpeg', // Replace with actual image
        duration: '3:00',
        audioFile: 'song1.mp3',
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        albumCover: 'C:\Users\abirami\OneDrive\Documents\PROJECT\internship music\mu.2.jpeg', // Replace with actual image
        duration: '3:30',
        audioFile: 'song2.mp3', // Replace with actual audio path
    },
    {
        title: 'Song 3',
        artist: 'Artist 3',
        albumCover: 'C:\Users\abirami\OneDrive\Documents\PROJECT\internship music\mu.3.jpeg', // Replace with actual image
        duration: '2:50',
        audioFile: 'song3.mp3', // Replace with actual audio path
    },
];

// DOM Elements
const albumCover = document.querySelector('.album-cover img');
const trackName = document.querySelector('.track-name');
const artistName = document.querySelector('.artist-name');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const playButton = document.getElementById('play-btn');
const favButton = document.getElementById('fav-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const playlistContainer = document.querySelector('.playlist-container');

// Audio Object
const audio = new Audio();

// Initialize Player
function updateTrackInfo(songIndex) {
    const song = playlist[songIndex];
    albumCover.src = song.albumCover;          // Update Album Cover
    trackName.textContent = song.title;        // Update Title
    artistName.textContent = song.artist;      // Update Artist
    totalTimeDisplay.textContent = song.duration; // Display Duration
    audio.src = song.audioFile;                // Load Audio Source
    highlightCurrentTrack(songIndex);          // Highlight Active Track
}

// Toggle Play/Pause
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '⏸';
    } else {
        audio.pause();
        playButton.innerHTML = '▶';
    }
}

// Navigate to Next Track
function nextTrack() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    updateTrackInfo(currentSongIndex);
    audio.play();
    playButton.innerHTML = '⏸';
}

// Navigate to Previous Track
function prevTrack() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    updateTrackInfo(currentSongIndex);
    audio.play();
    playButton.innerHTML = '⏸';
}

// Toggle Favorite with Animation
function toggleFavorite() {
    favButton.classList.toggle('active');
    const song = playlist[currentSongIndex];
    if (favButton.classList.contains('active')) {
        alert(`${song.title} added to favorites! ❤️`);
    } else {
        alert(`${song.title} removed from favorites! 💔`);
    }
}

// Update Current Time Display
audio.addEventListener('timeupdate', () => {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeDisplay.textContent = `${minutes}:${seconds}`;
});

// Auto-Play Next Track when Current Track Ends
audio.addEventListener('ended', nextTrack);

// Highlight the Active Playlist Item
function highlightCurrentTrack(index) {
    document.querySelectorAll('.playlist-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
    });
}

// Populate Playlist in DOM
function loadPlaylist() {
    playlistContainer.innerHTML = playlist
        .map((song, index) => `
            <div class="playlist-item" data-index="${index}">
                <span>${song.title} - ${song.artist}</span>
            </div>
        `)
        .join('');
}

// Playlist Click Handler
playlistContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('playlist-item')) {
        currentSongIndex = parseInt(e.target.dataset.index);
        updateTrackInfo(currentSongIndex);
        audio.play();
        playButton.innerHTML = '⏸';
    }
});

// Event Listeners
playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
favButton.addEventListener('click', toggleFavorite);

// Initialize Player on Load
loadPlaylist();
updateTrackInfo(currentSongIndex);
