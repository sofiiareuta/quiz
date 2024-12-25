
        const questions = [
            {
                question: "Which is the largest animal in the world?",
                answers: [
                    { text: "Shark", correct: false },
                    { text: "Blue whale", correct: true },
                    { text: "Elephant", correct: false },
                    { text: "Giraffe", correct: false }
                ]
            },
            {
                question: "Which is the smallest country in the world?",
                answers: [
                    { text: "Vatican City", correct: true },
                    { text: "Bhutan", correct: false },
                    { text: "Nepal", correct: false },
                    { text: "Sri Lanka", correct: false }
                ]
            },
            {
                question: "Which is the largest desert in the world?",
                answers: [
                    { text: "Kalahari", correct: false },
                    { text: "Gobi", correct: false },
                    { text: "Sahara", correct: true },
                    { text: "Antarctica", correct: false }
                ]
            },
            {
                question: "Which is the smallest continent in the world?",
                answers: [
                    { text: "Asia", correct: false },
                    { text: "Australia", correct: true },
                    { text: "Arctic", correct: false },
                    { text: "Africa", correct: false }
                ]
            }
        ];

        const questionElement = document.getElementById("question");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");

        let currentQuestionIndex = 0;
        let score = 0;

        async function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            await showQuestion();
        }

        async function showQuestion() {
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                answerButtons.appendChild(button);
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
            });

            // Ждем, пока пользователь нажмет кнопку "Далее"
            await new Promise(resolve => {
                nextButton.onclick = () => {
                    handleNextButton();
                    resolve(); // Возвращаем управление после нажатия на кнопку
                };
            });
        }

        function resetState() {
            nextButton.style.display = "none";
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
            }
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true; // Отключить все кнопки после выбора
            });
            nextButton.style.display = "block"; // Показать кнопку "Далее"
        }

        function showScore() {
            resetState();
            questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
            nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }

        // Запуск викторины при загрузке страницы
        startQuiz();
