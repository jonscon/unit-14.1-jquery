let currentMovieId = 0; // Counter to track which movie the user is on
const list = []; // List of movies and ratings

// Event listener when movie and rating are submitted
$('#movie-form').on('submit', function(e) {
    e.preventDefault();
    let title = $("input").eq(0).val();
    let rating = $('input').eq(1).val();

    // Append a movie div and append the actual content in the div
    $('#movies-container').append('<tr id="movie-' + currentMovieId + '"></tr>');
    $('#movie-' + currentMovieId).append('<td>' + title + '</td>' + '<td>' + rating + '</td>' + '<td>' + '<button class="remove-button">Remove</button><br>' + '</td>');

    // Clear input fields after submission
    $('input').eq(0).val('');
    $('input').eq(1).val('');

    list.push({title, rating, currentMovieId});
    currentMovieId += 1;
})

// Event listener for removing each movie and rating; attached to tbody because it exists at time of load
$('tbody').on('click', '.remove-button', function(e) {
    e.target.closest('tr').remove(); // remove closest 

    // Find the index of element that matches the movie-id of clicked parent tr 
    let itemToRemove = list.findIndex(element => {
        return $(this).parent().parent().attr('id') === "movie-" + element.currentMovieId;
    })
    list.splice(itemToRemove, 1);
})

// Event listener for sorting through chosen list
$('.arrow').on('click', function() {
    // Initializers
    let listType = $(this).attr('id');
    let direction = $(this).hasClass('headerSortDown') ? "down" : "up";
    let sortedMovies = sortList(list, listType, direction);
    $('#movie-body').empty();

    // Append sorted movies from the array into the #movie-body container
    for (let movie of sortedMovies) {
        let rowToAppend = createMovieRow(movie);
        $('#movie-body').append(rowToAppend);
    }
    
    // Switch the arrow on the front-end
    $(this).toggleClass('headerSortDown');
    $(this).toggleClass('headerSortUp');
})

// Function to sort the list
function sortList(array, listType, direction) {
    return array.sort(function(a, b) {
        if (listType === "rating") { // Must convert ratings to numbers, since they are originally strings
            a[listType] = +a[listType];
            b[listType] = +b[listType];
        }
        if (a[listType] > b[listType]) { // If arrow is up when clicked, user wants to see in alphabetical order
            return direction === "up" ? 1 : -1; // Switch both elements
        }
        else if (a[listType] < b[listType]) {
            return direction === "up" ? -1 : 1; // Do not switch elements
        }
        return 0; // Keep elements in the same order
    })
}

// Function to create new table row and table data
function createMovieRow(movie) {
    return `<tr id="movie-${movie.currentMovieId}">
    <td>${movie.title}</td>
    <td>${movie.rating}</td>
    <td><button class="remove-button">Remove</button><br></td>
    </tr>`;
}