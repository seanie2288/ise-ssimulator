document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'block';
});
let currentQuestion = 0;
let score = 0;
let questions = [];
let timer;
let timeLeft = 0;

document.getElementById('exam-select').addEventListener('change', function () {
  const exam = this.value;
  if (!exam) return;

  fetch(`exams/${exam}.json`)
    .then(res => res.json())
    .then(data => {
      questions = data.questions;
      timeLeft = data.timeLimit;
      currentQuestion = 0;
      score = 0;
      document.getElementById('submit-btn').style.display = 'block';
      startTimer();
      showQuestion();
    });
});

function startTimer() {
  clearInterval(timer);
  const timeDisplay = document.getElementById('time');
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      endExam();
    } else {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

function showQuestion() {
  const container = document.getElementById('question-container');
  container.innerHTML = '';

  const q = questions[currentQuestion];
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.innerHTML = `<p>${q.question}</p>`;

  if (q.image) {
    const img = document.createElement('img');
    img.src = q.image;
    img.alt = "Question image";
    img.style.maxWidth = "100%";
    img.style.marginBottom = "10px";
    questionDiv.appendChild(img);
  }

  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'options';

  q.options.forEach((opt, i) => {
    optionsDiv.innerHTML += `
      <label>
        <input type="radio" name="option" value="${i}" />
        ${opt}
      </label>
    `;
  });

  questionDiv.appendChild(optionsDiv);
  container.appendChild(questionDiv);
}

document.getElementById('submit-btn').addEventListener('click', () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return alert('Please select an answer.');

  if (parseInt(selected.value) === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    clearInterval(timer);
    endExam();
  }
});

function endExam() {
  document.getElementById('question-container').innerHTML = '';
  document.getElementById('submit-btn').style.display = 'none';

  const resultDiv = document.getElementById('result');
  const percentage = (score / questions.length) * 100;
  const passed = percentage >= 70;

  resultDiv.innerHTML = `
    You scored ${score} out of ${questions.length} (${percentage.toFixed(1)}%)
    <br>
    <span class="${passed ? 'pass' : 'fail'}">
      ${passed ? '✅ Pass' : '❌ Fail'}
    </span>
  `;
}