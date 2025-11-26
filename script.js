function createTreeImage(name, color, emoji) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Pozadí
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#E8F5E8');
    gradient.addColorStop(1, '#C8E6C8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 300);

    // Hlavní barva stromu
    ctx.fillStyle = color;
    ctx.fillRect(80, 60, 240, 180);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(80, 60, 240, 90);

    // Rámeček
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 3;
    ctx.strokeRect(80, 60, 240, 180);

    // Text s názvem
    ctx.fillStyle = 'white';
    ctx.font = 'bold 28px "Comic Sans MS", cursive, sans-serif';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#1B5E20';
    ctx.lineWidth = 3;
    ctx.strokeText(name, 200, 140);
    ctx.fillText(name, 200, 140);

    // Emoji
    ctx.font = '40px Arial';
    ctx.fillText(emoji, 200, 190);

    return canvas.toDataURL('image/png');
}

const trees = [
    {
        name: "Smrk",
        image: createTreeImage("Smrk", "#0D4F3C", "🌲"),
        description: "Vysoký jehličnatý strom s kónickým tvarem"
    },
    {
        name: "Borovice",
        image: createTreeImage("Borovice", "#2E7D32", "🌲"),
        description: "Jehličnatý strom s oranžovou kůrou nahoře"
    },
    {
        name: "Modřín",
        image: createTreeImage("Modřín", "#4CAF50", "🌲"),
        description: "Jehličnatý strom, který na zimu shazuje jehličí"
    },
    {
        name: "Jedle",
        image: createTreeImage("Jedle", "#1B5E20", "🌲"),
        description: "Jehličnatý strom s rovnými větvemi"
    },
    {
        name: "Jírovec",
        image: createTreeImage("Jírovec", "#8BC34A", "🌰"),
        description: "Listnatý strom s velkými složenými listy a kaštany"
    },
    {
        name: "Buk",
        image: createTreeImage("Buk", "#689F38", "🌳"),
        description: "Listnatý strom s hladkou kůrou a bukvicemi"
    },
    {
        name: "Dub",
        image: "images/dub.jpg",
        description: "Listnatý strom s laločnatými listy a žaludy"
    },
    {
        name: "Vrba",
        image: createTreeImage("Vrba", "#9CCC65", "🌿"),
        description: "Listnatý strom rostoucí u vody s převislými větvemi"
    },
    {
        name: "Topol",
        image: createTreeImage("Topol", "#7CB342", "🌳"),
        description: "Vysoký listnatý strom s trojúhelníkovitými listy"
    },
    {
        name: "Lípa",
        image: createTreeImage("Lípa", "#66BB6A", "🌳"),
        description: "Listnatý strom se srdčitými listy"
    },
    {
        name: "Javor",
        image: createTreeImage("Javor", "#4CAF50", "🍁"),
        description: "Listnatý strom s dlanitými listy"
    },
    {
        name: "Bříza",
        image: createTreeImage("Bříza", "#81C784", "🌳"),
        description: "Listnatý strom s bílou kůrou s černými pruhy"
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


loadNewQuestion();