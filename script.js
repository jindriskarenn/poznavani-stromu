// Funkce pro vytvoření černobílé verze obrázku
function createBlackWhiteImage(imageSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            // Převést na černobílou
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                data[i] = gray;     // červená
                data[i + 1] = gray; // zelená
                data[i + 2] = gray; // modrá
            }

            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = imageSrc;
    });
}

// Základní stromy s barevnými obrázky
const baseTreesData = [
    { name: "Smrk", image: "images/smrk.jpg", description: "Vysoký jehličnatý strom s kónickým tvarem" },
    { name: "Borovice", image: "images/borovice.jpg", description: "Jehličnatý strom s oranžovou kůrou nahoře" },
    { name: "Modřín", image: "images/modrin.jpg", description: "Jehličnatý strom, který na zimu shazuje jehličí" },
    { name: "Jedle", image: "images/jedle.jpg", description: "Jehličnatý strom s rovnými větvemi" },
    { name: "Jírovec", image: "images/jirovec.jpg", description: "Listnatý strom s velkými složenými listy a kaštany" },
    { name: "Buk", image: "images/buk.jpg", description: "Listnatý strom s hladkou kůrou a bukvicemi" },
    { name: "Dub", image: "images/dub.jpg", description: "Listnatý strom s laločnatými listy a žaludy" },
    { name: "Vrba", image: "images/vrba.jpg", description: "Listnatý strom rostoucí u vody s převislými větvemi" },
    { name: "Topol", image: "images/topol.jpg", description: "Vysoký listnatý strom s trojúhelníkovitými listy" },
    { name: "Lípa", image: "images/lipa.jpg", description: "Listnatý strom se srdčitými listy" },
    { name: "Javor", image: "images/javor.jpg", description: "Listnatý strom s dlanitými listy" },
    { name: "Bříza", image: "images/briza.jpg", description: "Listnatý strom s bílou kůrou s černými pruhy" }
];

// Rozšířený seznam obsahující barevné i černobílé varianty
let trees = [];

// Inicializace stromů s černobílými variantami
async function initializeTrees() {
    trees = [];

    for (const treeData of baseTreesData) {
        // Přidej barevnou verzi
        trees.push({
            ...treeData,
            isBlackWhite: false
        });

        // Vytvoř a přidej černobílou verzi
        try {
            const bwImage = await createBlackWhiteImage(treeData.image);
            trees.push({
                name: treeData.name,
                image: bwImage,
                description: treeData.description + " (černobílá verze)",
                isBlackWhite: true
            });
        } catch (error) {
            console.log('Chyba při vytváření ČB verze pro', treeData.name);
        }
    }

    console.log(`Načteno ${trees.length} variant stromů (${baseTreesData.length} barevných + ${trees.length - baseTreesData.length} černobílých)`);
}

let currentTree = null;
let lastTreeName = null;  // Pro zabránění opakování
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
    // Najdi všechny možné stromy kromě posledního zobrazeného
    const availableTrees = trees.filter(tree => tree.name !== lastTreeName);

    if (availableTrees.length === 0) {
        // Fallback - pokud by se něco pokazilo, použij všechny stromy
        const shuffled = [...trees].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const shuffled = [...availableTrees].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function loadNewQuestion() {
    feedbackDiv.style.display = 'none';

    const questionTrees = getRandomTrees(3);
    correctAnswerIndex = Math.floor(Math.random() * 3);
    currentTree = questionTrees[correctAnswerIndex];

    // Zapamatuj si název stromu pro příště
    lastTreeName = currentTree.name;

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


// Spustit aplikaci po načtení všech obrázků
async function startApplication() {
    console.log('Načítám stromy...');
    await initializeTrees();
    console.log('Stromy načteny, spouštím kvíz...');

    // Skryj loading a zobraz kvíz
    document.getElementById('loading').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    loadNewQuestion();
}

// Spustit aplikaci
startApplication();