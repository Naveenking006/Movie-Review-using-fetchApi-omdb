var p = 0;
var output = '';
//Search Results 

async function getMovies(event) {

    if (event === 'search') {
        p = 1;
        output = '';
    }
    if (event === 'more') {
        p = p + 1
    }
    console.log(p);



    document.body.style.backgroundColor = '#343830'; //#343830

    document.getElementById("center").style.marginTop = "3px";
    document.getElementById("center").style.marginDown = "10px";
    var a = document.getElementById("searchText");
    var q = a.value;
    var c = document.getElementById("container");
    let more = document.getElementById("more");

    if (q.length > 0) {
        try {
            let response = await fetch(`http://www.omdbapi.com/?apikey=b27df6a2&type=movie&s=${q}&page=${p}`);
            let data = await response.json()
            if (data.Response === 'True') {
                let movies = data.Search;
                console.log(movies);
                movies.forEach(function(movie, index) {
                    console.log(movie);

                    output += `
            
            
             <img id="img" src="${movie.Poster}" onclick="movieSelected('${movie.imdbID}')")>
            
          `;
                    c.innerHTML = output;
                });

                more.innerHTML = `<button id='showmore' onclick="getMovies('more')"> Show More Films</button>`

            } else {
                c.innerHTML = `<img id="oops" src="https://vevmo.com/sites/default/files/upload/no_results.png" )>`
                more.innerHTML = '';
            }
        } catch (err) {
            console.error(err);
            // Handle errors here
        }

    } else {
        document.body.style.backgroundColor = 'blue';
        document.getElementById("center").style.marginTop = "15%";
        document.getElementById("center").style.marginDown = " 1%";
        c.innerHTML = '';
        more.innerHTML = '';
    }

}


// Selected Movie Details
async function movieDetails() {
    var id = localStorage.getItem('movieId');

    console.log(id);

    var box = document.getElementById("review");
    var result = '';

    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=b27df6a2&i=${id}`);
        let data = await response.json()
        console.log(data);
        let movie = data;

        result += `
            
            
        

       
        <div class="card2">
         <div class="card1">
            <img src=${data.Poster} alt=${data.Title}"Denim Jeans" style="width:100%">
        </div>
            <h1>${data.Title}</h1>
            <p class="rating">imdbRating:${data.imdbRating}</p>
    
        
            <table>
                <tr>
                    <td>Year</td>
                    <td>${data.Year}</td>
                </tr>
                <tr>
                    <td>Released</td>
                    <td>${data.Released}</td>
                </tr>
                <tr>
                    <td>Genre</td>
                    <td>${data.Genre}</td>
                </tr>
                <tr>
                    <td>Director</td>
                    <td>${data.Director}</td>
                </tr>
                <tr>
                    <td>Actors</td>
                    <td>${data.Actors}</td>
                </tr>
                <tr>
                    <td>Language</td>
                    <td>${data.Language}</td>
                </tr>
            </table>
        </div>
    
            
          `;
        box.innerHTML = result;

    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}

// Send a MovieId and Redirect to Movie Details Page
function movieSelected(id) {
    localStorage.setItem('movieId', id);
    window.open('movie.html');
    return false;
}
