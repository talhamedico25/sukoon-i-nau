document.addEventListener('DOMContentLoaded', () => {
    
    // --- Data (Urdu PHQ-9) ---
    const questions = [
        "کیا آپ نے پچھلے دو ہفتوں میں کام کاج میں دلچسپی یا خوشی کی کمی محسوس کی ہے؟",
        "کیا آپ اداسی، مایوسی یا بے چارگی کا شکار رہے ہیں؟",
        "کیا آپ کو نیند آنے میں دشواری، نیند ٹوٹنے یا بہت زیادہ نیند آنے کا مسئلہ رہا ہے؟",
        "کیا آپ تھکاوٹ یا توانائی کی کمی محسوس کرتے ہیں؟",
        "کیا آپ کو بھوک کی کمی یا بہت زیادہ کھانے کی شکایت رہی ہے؟",
        "کیا آپ اپنی ذات کے بارے میں برا محسوس کرتے ہیں کہ آپ ناکام ہیں یا آپ نے خود کو یا گھر والوں کو مایوس کیا ہے؟",
        "کیا آپ کو چیزوں پر توجہ مرکوز کرنے میں دشواری ہوتی ہے، جیسے اخبار پڑھنا یا ٹی وی دیکھنا؟",
        "کیا آپ کے چلنے پھرنے یا بولنے کا انداز اتنا سست ہے کہ دوسرے لوگوں نے محسوس کیا ہو؟",
        "کیا آپ کے ذہن میں یہ خیال آیا کہ آپ کے لیے مر جانا بہتر ہے یا آپ خود کو نقصان پہنچائیں؟"
    ];

    // --- State Variables ---
    let currentQ = 0;
    let score = 0;

    // --- DOM Elements ---
    const quizView = document.getElementById('quiz-view');
    const resultView = document.getElementById('result-view');
    const qText = document.getElementById('q-text');
    const qNumber = document.getElementById('q-number');
    const progressBar = document.getElementById('progress-bar');
    const optionsBtns = document.querySelectorAll('.option-btn');
    const restartBtn = document.getElementById('restart-btn');
    const scoreDisplay = document.getElementById('score-display');
    const resultMessage = document.getElementById('result-message');
    const crisisActions = document.getElementById('crisis-actions');
    const appCard = document.getElementById('app-card');

    // --- Quiz Functions ---

    function initQuiz() {
        score = 0;
        currentQ = 0;
        quizView.classList.remove('hidden');
        resultView.classList.add('hidden');
        crisisActions.classList.add('hidden');
        resultView.classList.remove('crisis-mode');
        updateUI();
    }

    function updateUI() {
        // Update Text
        qText.innerText = questions[currentQ];
        qNumber.innerText = currentQ + 1;
        
        // Update Progress Bar
        const progress = ((currentQ) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function handleAnswer(e) {
        const value = parseInt(e.target.getAttribute('data-value'));
        score += value;
        currentQ++;

        if (currentQ < questions.length) {
            updateUI();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizView.classList.add('hidden');
        resultView.classList.remove('hidden');
        progressBar.style.width = '100%';

        scoreDisplay.innerText = score;

        // Severity Logic
        if (score <= 4) {
            resultMessage.innerText = "آپ کا اسکور نارمل ہے۔ (Minimal Depression)";
        } else if (score <= 9) {
            resultMessage.innerText = "ہلکی علامات۔ (Mild Depression)";
        } else if (score <= 14) {
            resultMessage.innerText = "درمیانے درجے کی علامات۔ (Moderate Depression)";
        } else {
            // High Urgency
            resultMessage.innerText = "شدید علامات۔ براہ کرم ڈاکٹر سے رجوع کریں۔ (Severe Depression)";
            crisisActions.classList.remove('hidden');
            resultView.classList.add('crisis-mode');
        }
    }

    // --- Event Listeners ---
    
    // Quiz Options
    optionsBtns.forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });

    // Restart Button
    restartBtn.addEventListener('click', initQuiz);

    // --- Modal Logic ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const openTermsBtn = document.getElementById('open-terms');
    const openPrivacyBtn = document.getElementById('open-privacy');

    function openModal(type) {
        modalOverlay.style.display = 'flex';
        if (type === 'terms') {
            modalTitle.innerText = "Terms of Service";
            modalBody.innerText = "This tool is for educational purposes only and does not constitute a medical diagnosis. By using this tool, you agree that the creators are not liable for health outcomes.";
        } else {
            modalTitle.innerText = "Privacy Policy";
            modalBody.innerText = "We value your privacy. This tool runs entirely in your browser. No personal data or quiz answers are sent to any server.";
        }
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    openTermsBtn.addEventListener('click', () => openModal('terms'));
    openPrivacyBtn.addEventListener('click', () => openModal('privacy'));
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    window.addEventListener('click', (event) => {
        if (event.target == modalOverlay) {
            closeModal();
        }
    });

    // Initialize on load
    initQuiz();
});