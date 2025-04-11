//Dated  : 10/04/2025 
//Author : Sachin Sasidharan

//DOM Elements

const searchButton = document.getElementById('searchButton') //Search Button
const movieDetails = document.getElementById('movieDetails') //Movie Details Div
const errorHandling = document.getElementById('errorHandling') // Handling Error

//Initial
movieDetails.innerHTML = ''
errorHandling.innerText = ''
searchButton.disabled = true

//Enable searchButton
inputBox.addEventListener('input', () => {
    searchButton.disabled = inputBox.value.trim() === ''
})

//Enter key search for better UX 

inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')
        searchButton.click()
})

//Event listner to caputre the button click
searchButton.addEventListener('click', async () => {

    const inputMovie = document.getElementById('inputBox').value.trim() // Input Box
    movieDetails.innerHTML = ''
    errorHandling.innerText = ''

    try {

        //this will not work due to disabled button
        if (!inputMovie) {
            errorHandling.innerText = 'Enter a movie name'
            return
        }

        const response = await fetch(`http://www.omdbapi.com/?t=${inputMovie}&apikey=dd2a9670`)
        const data = await response.json()

        //checks if the response is false
        if (data.Response === "False") {
            errorHandling.textContent = 'Movie not found'
        } else {

            //Displays movie details, if the response is true
            movieDetails.innerHTML = `
            <div class="row moviedetails">
                
                <div class="col-md-6 col-lg-3 mt-3">
                    <img src="${data.Poster !== 'N/A' ? data.Poster : "./img/movieIcon.jpg"}" alt="Movie Poster" class="img-fluid poster">
                </div>

                <div class="col-12 col-md-6 p-3 bg-light">
                    <h2><strong>Title & Date :</strong> ${data.Title} (${data.Year})</h2>
                    <p><strong>Plot : </strong> ${data.Plot}</p>
                    <p><strong>Director : </strong>${data.Director}</p>
                    <p><strong>Actors : </strong>${data.Actors}</p>
                    <p><strong>Language : </strong>${data.Language}</p>
                    <p><strong>IMDb rating : </strong>${data.imdbRating}</p>
                </div>
            </div>
            `}
    }
    //To Handle error
    catch (error) {
        console.error('Error message', error)
    }
}


)
