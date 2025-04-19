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
function setSurahRowTemplate(number, arabicName, englishName, translation) {
    return `
        <a href="pages/surah.html?number=${number}" class="text-lg hover:text-blue-500 group">
            <div class="flex gap-4">
                <span class="">${number}.</span> ${arabicName} 
            </div>
            <div class="flex gap-4 text-gray-500 group-hover:text-blue-500">
                <span>&nbsp;</span>${englishName} (${translation})
            </div>
        </a>`;
}


//get element list surah
async function getElementSurahList() {
    try {
        const surahList = await getSurahList();

        let surahElements = surahList.map((surah) => {
            return setSurahRowTemplate(surah.number, surah.name, surah.englishName, surah.englishNameTranslation);
        })

        return surahElements.join('');
    } catch (error) {
        return 'Error fetching surah list';
    }
}


async function renderSurahList() {
    const app = document.getElementById('app');
    const renderedSurahList = await getElementSurahList();
    app.innerHTML = renderedSurahList;
}




renderSurahList();
