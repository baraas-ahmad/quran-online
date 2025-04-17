async function getSurahList() {
    const url = 'http://api.alquran.cloud/v1/surah';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;

        // console.log('Surah List:', data.data);
    } catch (error) {
        console.error('Error fetching surah list:', error);
    }
}

function renderSurah(number, name, translation) {
    return `${number} - ${name} (${translation})`;
}

async function renderSurahList() {
    try {
        const surahList = await getSurahList();
        console.log('Surah List:', surahList);

        let surahElements = '';
        for (let i = 0; i < surahList.length; i++) {
            surahElements += renderSurah(surahList[i].number, surahList[i].name, surahList[i].englishName) + '<br>';
        }
        return surahElements;
    } catch (error) {
        return 'Error fetching surah list';
    }
}

async function renderAll() {
    const app = document.getElementById('app');
    const renderedSurahList = await renderSurahList();
    app.innerHTML = renderedSurahList;
}



renderAll();
