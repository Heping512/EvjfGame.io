window.quizAudio = {
    playTicTac: function () {
        const audio = document.getElementById("audio-tictac");
        if (audio) {
            audio.loop = true;
            audio.currentTime = 0;
            audio.play();
        }
    },
    stopTicTac: function () {
        const audio = document.getElementById("audio-tictac");
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    },
    playDong: function () {
        const audio = document.getElementById("audio-dong");
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
};
