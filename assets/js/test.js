function toggleAnswer(index) {
  const questions = document.querySelectorAll('.question');
  const answers = document.querySelectorAll('.answer');

  if (answers[index].style.display === 'block') {
      answers[index].style.display = 'none';
      questions[index].classList.remove('open');
  } else {
      answers.forEach(answer => answer.style.display = 'none');
      questions.forEach(question => question.classList.remove('open'));
      answers[index].style.display = 'block';
      questions[index].classList.add('open');
  }
}

function scrollToContent() {
  document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
}