


// id to keep track of which element to remove 
let currentId = 0;
// list of all of movies in memory for sorting / repainting
let moviesList = [];

$(function (){ 
    // when you click the delete button, remove the closest parent tr
    $("#new-movie").on("submit",function(event){
        event.preventDefault();
        let title = $("#title").val();
        console.log(title)
        let rating = $("#rating").val();
        let movieData = {title, rating, currentId};

        const HTMLtoAppend = createMovieDataHTML(movieData);

        currentId ++;
        moviesList.push(movieData);

        $("#table-body").append(HTMLtoAppend);
        // return to empty input so the user can add another movie
        $("#new-movie").trigger("reset");
    });

    // when the delete button is clicked, remove the closest parent tr 
    // and remove from the array of movies
    $("tbody").on("click",function(e){
        let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(e.target).data("deleted"));
        // remove it from the array of movies
        moviesList.splice(indexToRemoveAt,1)

        // remove it from the DOM
        $(e.target).closest("tr").remove();
    });

    // when arrow is clicked
    $(".fas").on("click", function(e){
       let direction = $(e.target).hasClass("fa-sort-down") ? "down" : "up";
       let keyToSortBy = $(e.target).attr("id");
       let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

       //empty the table
       $("#table-body").empty();

       // loop over our object of sortedMovies and append a new row
       for(let movie of sortedMovies){
           const HTMLtoAppend = createMovieDataHTML(movie);
           $("#table-body").append(HTMLtoAppend);
       }

       // toggle the arrow
       $(e.target).toggleClass("fa-sort-down");
       $(e.target).toggleClass("fa-sort-up");
    });
});

// accepts an array of objects and a key and sorts by that key 
function sortBy(array, keyToSortBy, direction){
    return array.sort(function(a,b) {
        if (keyToSortBy === "movie-rating"){
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
        }
        if (a[keyToSortBy] > b[keyToSortBy]){
            return direction === "up" ? 1 : -1;
        } else if (b[keyToSortBy] > a[keyToSortBy]) {
            return direction === "up" ? -1 : 1;
        }
        return 0;
    });
}

// createMovieDataHTML accepts an object with title and rating keys
// and returns a string of HTML
function createMovieDataHTML(data){
    return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
            <button class="btn" data-delete=${data.currentId}>
            Delete
            </button>
        </td>
    <tr>
    `;
}