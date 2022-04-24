const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search teams.json and filter it
const searchTeams = async searchText => {
    const res = await fetch('../data/teams.json');
    const teams = await res.json();

    // Get matches to current text input
    let matches = teams.filter(team => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return team.mascot.match(regex) || team.team.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches .map(match =>
           `<div class="card card-body mb-1">
           <img src="${match.img}" class="card-img mb-2">
            <h4 class="text-center"><span class="text-white">${match.team}</span></h4><h5 class="text-center"><span class="text-white">${match.mascot}</h5>
            <h6 class="text-center">Conference: ${match.conference} &nbsp; Region: ${match.region}</h6>
            <small class="text-center">Location: ${match.location}</small> 
            <h5 class="text-center mt-2"><a href="${match.link}" target="_blank" class="text-warning">Videos</a></h5>
           </div> `
        )
        .join('');

        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchTeams(search.value));