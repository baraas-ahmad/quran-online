//func get API
async function getSurahList() {
    const url = 'http://api.alquran.cloud/v1/surah';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching surah list:', error);
    }
}

//template UI Surah
function setSurahTemplate(number, arabicName, englishName, translation) {
    return `
        <div class="text-lg">
            <div class="flex gap-4">
                <span class="">${number}.</span> ${arabicName} 
            </div>
            <div class="flex gap-4 text-gray-500">
                <span>&nbsp;</span>${englishName} (${translation})
            </div>
        </div>`;
}


//get element list surah
async function getElementSurahList() {
    try {
        const surahList = await getSurahList();

        let surahElements = surahList.map((surah) => {
            return setSurahTemplate(surah.number, surah.name, surah.englishName, surah.englishNameTranslation);
        })
        return surahElements.join('');
    } catch (error) {
        return 'Error fetching surah list';
    }
}


async function renderAll() {
    const app = document.getElementById('app');
    const renderedSurahList = await getElementSurahList();
    app.innerHTML = renderedSurahList;
}



renderAll();
