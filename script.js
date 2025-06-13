document.addEventListener('DOMContentLoaded', function() {
    const learnMoreBtn = document.getElementById('learnMore');
    const quizContainer = document.getElementById('quiz-container');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');
    const nextBtn = document.getElementById('next-btn');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const newsletterForm = document.getElementById('newsletter-form');
    const formMessage = document.getElementById('form-message');

    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            question: "What does WCAG stand for?",
            options: [
                "Web Content Accessibility Guidelines",
                "Worldwide Computer Access Group",
                "Web Coding and Graphics",
                "Website Content Approval Group"
            ],
            correct: 0
        },
        {
            question: "Which of these is NOT a disability that web accessibility addresses?",
            options: [
                "Visual impairments",
                "Hearing impairments",
                "Mobility impairments",
                "Height impairments"
            ],
            correct: 3
        },
        {
            question: "What is the minimum recommended contrast ratio for normal text?",
            options: [
                "2:1",
                "3:1",
                "4.5:1",
                "7:1"
            ],
            correct: 2
        }
    ];

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            alert('Accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites and tools.');
        });
    }

    if (quizContainer) {
        function showQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            
            optionsElement.innerHTML = '';
            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => selectAnswer(index));
                optionsElement.appendChild(button);
            });
            
            nextBtn.style.display = 'none';
            resultElement.textContent = '';
        }

        function selectAnswer(selectedIndex) {
            const currentQuestion = questions[currentQuestionIndex];
            const correct = selectedIndex === currentQuestion.correct;
            
            if (correct) {
                score++;
                resultElement.textContent = 'Correct!';
                resultElement.style.color = '#2ecc71';
            } else {
                resultElement.textContent = `Incorrect! The correct answer is: ${currentQuestion.options[currentQuestion.correct]}`;
                resultElement.style.color = '#e74c3c';
            }
            
            Array.from(optionsElement.children).forEach(button => {
                button.disabled = true;
            });
            
            nextBtn.style.display = 'block';
        }

        function showNextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                quizContainer.innerHTML = `
                    <h2>Quiz Completed!</h2>
                    <p>Your score: ${score} out of ${questions.length}</p>
                    <button onclick="location.reload()">Try Again</button>
                `;
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', showNextQuestion);
            showQuestion();
        }
    }

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                answer.classList.toggle('active');
                
                const isExpanded = answer.classList.contains('active');
                this.setAttribute('aria-expanded', isExpanded);
            });
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if (email.includes('@') && email.includes('.')) {
                formMessage.textContent = 'Thank you for subscribing!';
                formMessage.style.color = '#2ecc71';
                this.reset();
            } else {
                formMessage.textContent = 'Please enter a valid email address';
                formMessage.style.color = '#e74c3c';
            }
        });
    }
});