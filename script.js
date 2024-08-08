function showUsernamePage() {
    const welcomePage = document.getElementById('welcome-page');
    const usernamePage = document.getElementById('username-page');

    welcomePage.classList.remove('show');
    welcomePage.classList.add('hide');

    setTimeout(() => {
        welcomePage.style.display = 'none';
        usernamePage.classList.remove('hide');
        usernamePage.classList.add('show');
        usernamePage.style.display = 'flex';
    }, 500); // Wait for the transition to complete
}

async function fetchRepos() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '';

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`User not found: ${username}`);
        }
        const repos = await response.json();

        repos.forEach(repo => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = repo.html_url;
            link.textContent = repo.name;
            link.target = '_blank';
            listItem.appendChild(link);
            repoList.appendChild(listItem);
        });
    } catch (error) {
        alert(error.message);
    }
}
