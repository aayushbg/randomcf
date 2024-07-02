document.getElementById('fetchQuestion').addEventListener('click', fetchRandomQuestion);

async function fetchRandomQuestion() {
  const tag = document.getElementById('tag').value;
  const lowerBound = parseInt(document.getElementById('lowerBound').value) || 0;
  const upperBound = parseInt(document.getElementById('upperBound').value) || 3500;
  
  const response = await fetch('https://codeforces.com/api/problemset.problems');
  const data = await response.json();
  
  if (data.status === 'OK') {
    let problems = data.result.problems;
    
    // Filter problems by tag
    if (tag) {
      problems = problems.filter(problem => problem.tags.includes(tag));
    }
    
    // Filter problems by rating
    problems = problems.filter(problem => problem.rating >= lowerBound && problem.rating <= upperBound);
    
    if (problems.length > 0) {
      const randomIndex = Math.floor(Math.random() * problems.length);
      const randomProblem = problems[randomIndex];
      displayQuestion(randomProblem);
    } else {
      document.getElementById('question').innerText = 'No problems found with the selected criteria.';
    }
  } else {
    document.getElementById('question').innerText = 'Failed to fetch questions. Please try again.';
  }
}

function displayQuestion(problem) {
  const questionDiv = document.getElementById('question');
  questionDiv.innerHTML = `
    <h2>${problem.name}</h2>
    <p>Contest ID: ${problem.contestId}</p>
    <p>Index: ${problem.index}</p>
    <p>Tags: ${problem.tags.join(', ')}</p>
    <a href="https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}" target="_blank">View Problem</a>
  `;
}
