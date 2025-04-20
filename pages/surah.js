// fetch surah page
async function getSurahPage(number) {
    const url = `https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('data :', data);
        return data.data;
    } catch (error) {
        console.error('Error fetching surah page:', error);
    }
}

function setSurahPageTemplate(text, audio) {
    return `
        <div class="p-6 bg-white text-gray-800 rounded-lg shadow-md text-center 
        border-b border-gray-400 font-sans">
        ${text}
        <audio controls>
        <source src="${audio}" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
        </div>
        `
}

// let audioArr = [];

function playAudio(sounds) {
    let currentIndex = 0; // keep track of the current index
    const play = document.getElementById('play-button');
    const pause = document.getElementById('pause-button');
    const stop = document.getElementById('stop-button');

    sounds.forEach(function (sound) {
        sound.onended = onended; // add the same event listener for all audios in our array
    });

    function onended(evt) {
        currentIndex = (currentIndex + 1); // increment our index
        if (currentIndex >= sounds.length) {
            currentIndex = 0; // reset to the first sound
            sounds[0].pause(); // pause the first sound
            sounds[0].currentTime = 0; // reset to the beginning
        } else {
            sounds[currentIndex].play(); // play the next sound
        }
        console.log(currentIndex, "audio index");
    }

    play.onclick = function () {
        if (sounds.length > 0) {
            sounds[currentIndex].play();
        }
    }
    pause.onclick = function () {
        sounds[currentIndex].pause();
    }
    stop.onclick = function () {
        sounds[currentIndex].pause();
        sounds[currentIndex].currentTime = 0; // reset to the beginning
        currentIndex = 0; // reset the index
    }
}

async function renderSurahPage(surahNumber) {
    const surahTitle = document.getElementById('surah-title');
    const page = document.getElementById('page');

    try {
        const surah = await getSurahPage(surahNumber);
        const title = surah.englishName;
        const ayahs = surah.ayahs;

        let ayahArr = [];
        let audioArr = [];
        for (let i = 0; i < ayahs.length; i++) {
            ayahArr.push(setSurahPageTemplate(ayahs[i].text, ayahs[i].audio))
            audioArr.push(new Audio(ayahs[i].audio));
        }

        surahTitle.innerText = title;
        page.innerHTML = ayahArr.join('');
        playAudio(audioArr);
    } catch (error) {

    }

}


let surahNumber = location.search.split('number=')[1]
console.log(location.search.split('number='));
renderSurahPage(surahNumber);
