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

    treeImage.src = currentTree.image;
    treeImage.alt = `Obrázek stromu ${currentTree.name}`;

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
    treeImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk9icsOhemVrIG5lbnalDlvZGVuPC90ZXh0Pjwvc3ZnPg==';
    treeImage.alt = 'Obrázek nenalezen';
});

loadNewQuestion();