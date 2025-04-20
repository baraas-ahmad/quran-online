// fetch surah page
async function getSurahPage(number) {
    const url = `https://api.alquran.cloud/v1/surah/${number}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('data :', data.data);
        return data.data;
    } catch (error) {
        console.error('Error fetching surah page:', error);
    }
}

function setSurahPageTemplate(data) {
    return `
        <div class="p-6 bg-white text-gray-800 rounded-lg shadow-md text-center 
        border-b border-gray-400 font-sans">
        ${data}</div>`
}

async function renderSurahPage(surahNumber) {
    const surahTitle = document.getElementById('surah-title');
    const page = document.getElementById('page');

    try {
        const surah = await getSurahPage(surahNumber);
        const title = surah.englishName;
        const ayahs = surah.ayahs;

        let ayahArr = [];
        for (let i = 0; i < ayahs.length; i++) {
            ayahArr.push(setSurahPageTemplate(ayahs[i].text))

        }
        console.log(ayahArr);

        surahTitle.innerText = title;
        page.innerHTML = ayahArr.join('');
    } catch (error) {

    }

}


let surahNumber = location.search.split('number=')[1]
console.log(location.search.split('number='));
renderSurahPage(surahNumber);