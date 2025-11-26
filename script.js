// Obrázky stromů nahrané uživatelem
const trees = [
    {
        name: "Smrk",
        image: "images/smrk.jpg",
        description: "Vysoký jehličnatý strom s kónickým tvarem a krátkými jehličkami"
    },
    {
        name: "Borovice",
        image: "images/borovice.jpg",
        description: "Jehličnatý strom s oranžovou kůrou nahoře a dlouhými jehlicemi"
    },
    {
        name: "Modřín",
        image: "images/modrin.jpg",
        description: "Jehličnatý strom, který na zimu shazuje jehličí"
    },
    {
        name: "Jedle",
        image: "images/jedle.jpg",
        description: "Jehličnatý strom s plochými jehlicemi a vzpřímeními šiškami"
    },
    {
        name: "Jírovec",
        image: "images/jirovec.jpg",
        description: "Listnatý strom s velkými složenými listy a kaštany"
    },
    {
        name: "Buk",
        image: "images/buk.jpg",
        description: "Listnatý strom s hladkou šedou kůrou a oválnými listy"
    },
    {
        name: "Dub",
        image: "images/dub.jpg",
        description: "Listnatý strom s laločnatými listy a žaludy"
    },
    {
        name: "Vrba",
        image: "images/vrba.jpg",
        description: "Listnatý strom rostoucí u vody s dlouhými převislými větvemi"
    },
    {
        name: "Topol",
        image: "images/topol.jpg",
        description: "Vysoký listnatý strom s trojúhelníkovitými listy"
    },
    {
        name: "Lípa",
        image: "images/lipa.jpg",
        description: "Listnatý strom se srdčitými listy a vonným květem"
    },
    {
        name: "Javor",
        image: "images/javor.jpg",
        description: "Listnatý strom s dlanitými listy a okřídlenými plody"
    },
    {
        name: "Bříza",
        image: "images/briza.jpg",
        description: "Listnatý strom s charakteristickou bílou kůrou s černými pruhy"
    }
];

let currentTree = null;
let correctAnswerIndex = 0;
let correctCount = 0;
let wrongCount = 0;

const treeImage = document.getElementById('current-tree');
const answerButtons = document.querySelectorAll('.answer-btn');
const feedbackDiv = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const correctSpan = document.getElementById('correct');
const wrongSpan = document.getElementById('wrong');

function getRandomTrees(count) {
    const shuffled = [...trees].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function loadNewQuestion() {
    feedbackDiv.style.display = 'none';

    const questionTrees = getRandomTrees(3);
    correctAnswerIndex = Math.floor(Math.random() * 3);
    currentTree = questionTrees[correctAnswerIndex];

    // Přidat loading indikátor
    treeImage.style.opacity = '0.3';
    treeImage.alt = 'Načítá se obrázek...';

    // Přednahrání obrázku
    const img = new Image();
    img.onload = function() {
        treeImage.src = this.src;
        treeImage.style.opacity = '1';
        treeImage.alt = `Obrázek stromu ${currentTree.name}`;
    };

    img.onerror = function() {
        // Spustit error handler
        treeImage.dispatchEvent(new Event('error'));
        treeImage.style.opacity = '1';
    };

    img.src = currentTree.image;

    answerButtons.forEach((btn, index) => {
        btn.textContent = questionTrees[index].name;
        btn.className = 'answer-btn';
        btn.disabled = false;
    });
}

function showFeedback(isCorrect, selectedIndex) {
    answerButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correctAnswerIndex) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        feedbackText.textContent = `Správně! Je to ${currentTree.name}! 🎉`;
        feedbackText.className = 'correct';
        correctCount++;
        correctSpan.textContent = correctCount;
    } else {
        feedbackText.textContent = `Špatně! Správná odpověď je ${currentTree.name}. 😊`;
        feedbackText.className = 'wrong';
        wrongCount++;
        wrongSpan.textContent = wrongCount;
    }

    feedbackDiv.style.display = 'block';
}

answerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const isCorrect = index === correctAnswerIndex;
        showFeedback(isCorrect, index);
    });
});

nextBtn.addEventListener('click', loadNewQuestion);

treeImage.addEventListener('error', () => {
    console.log('Chyba načítání obrázku:', currentTree.name);
    // Fallback na Wikimedia Commons obrázky
    const fallbackImages = {
        "Smrk": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Picea_abies_001.jpg/400px-Picea_abies_001.jpg",
        "Borovice": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pinus_sylvestris_002.jpg/400px-Pinus_sylvestris_002.jpg",
        "Modřín": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Larix_decidua_001.jpg/400px-Larix_decidua_001.jpg",
        "Jedle": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Abies_alba_001.jpg/400px-Abies_alba_001.jpg",
        "Jírovec": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Aesculus_hippocastanum_002.jpg/400px-Aesculus_hippocastanum_002.jpg",
        "Buk": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Fagus_sylvatica_001.jpg/400px-Fagus_sylvatica_001.jpg",
        "Dub": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Quercus_robur_001.jpg/400px-Quercus_robur_001.jpg",
        "Vrba": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Salix_babylonica_001.jpg/400px-Salix_babylonica_001.jpg",
        "Topol": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Populus_nigra_001.jpg/400px-Populus_nigra_001.jpg",
        "Lípa": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Tilia_cordata_001.jpg/400px-Tilia_cordata_001.jpg",
        "Javor": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Acer_platanoides_001.jpg/400px-Acer_platanoides_001.jpg",
        "Bříza": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Betula_pendula_001.jpg/400px-Betula_pendula_001.jpg"
    };

    if (fallbackImages[currentTree.name]) {
        treeImage.src = fallbackImages[currentTree.name];
    } else {
        treeImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThkNWU4Ii8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzJFN0QzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjxmb250LXNpemU9IjQwcHgiPvCfjLM8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzJFN0QzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPicgKyBjdXJyZW50VHJlZS5uYW1lICsgJzwvdGV4dD48L3N2Zz4=';
    }
    treeImage.alt = 'Obrázek stromu ' + currentTree.name;
});

loadNewQuestion();