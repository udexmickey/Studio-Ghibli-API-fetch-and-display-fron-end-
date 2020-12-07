const app = document.getElementById("root");

const parentContainer = document.createElement("div")
parentContainer.setAttribute("class", "album py-5 bg-light")

const container = document.createElement("div")
container.setAttribute("class", "container")

const row = document.createElement("div")
row.setAttribute("class", "row")

const logo = document.createElement('img')
logo.src = 'download.png'


const footer = document.createElement("footer")
footer.setAttribute("class", "footerDiv")


// this where i appended my logo and container to the root div (app)
// app.append(logo)
app.append(display)


footer.innerHTML = "Made with love ❤"

var request = new XMLHttpRequest();

const url = "https://ghibliapi.herokuapp.com/films";

request.open("get", url, true);

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
 //  The JSON.parse will help convert the json files that will be sent
 // Bcat to us from the https request we made to thge external server
 // the convert it back for object that the browser understands

  if (request.status >= 200 && request.status < 400) {
      // Looping through the data we got back
      data.length = 6;
    data.forEach((movie) => {
        //This are the 4 details i need from from the data
        const title = movie.title                      // Tile
        const description = movie.description          // Description
        const producer = movie.producer                // Producer
        const director = movie.director                // Director

      
        console.log(parentContainer);
        const columnHolder = document.createElement("div")
        columnHolder.setAttribute("class", "col-md-4")

        const columnPositioner = document.createElement("div")
        columnPositioner.setAttribute("class", "card mb-4 box-shadow warning")

        
        const movieBody = document.createElement("div")
        movieBody.setAttribute("class", "card-body cardBody")

        const movieTitle = document.createElement("h5")
        movieTitle.setAttribute("class", "card-title")
        movieTitle.innerHTML = title;
        
        // Create p tag and set the text content to the film's description
        const MovieDetails = document.createElement('p')
        MovieDetails.setAttribute("class", "card-text")
         // Limit to 300 chars (TRANCATE)
        MovieDetails.textContent = `${description.substring(0, 280)}...` // End with an ellipses

        const movieOfficial = document.createElement("div")
        movieOfficial.setAttribute("class", "d-flex justify-content-between align-items-center")

        // Create h4 tag and set the text content to the film's title
        const producerName = document.createElement("small")
        producerName.setAttribute("class", "text-muted text-right")
        producerName.innerHTML = producer;

        // Create h5 tag and set the text content to the film's title
        const directorName = document.createElement("small")
        directorName.setAttribute("class", "text-muted text-left")
        directorName.innerHTML = director;
                
        movieBody.append(movieTitle)
        movieBody.append(MovieDetails)
        movieBody.append(movieOfficial)
        movieOfficial.append(producerName)
        movieOfficial.append(directorName)
        columnPositioner.append(movieBody)
        columnHolder.append(columnPositioner)
        row.append(columnHolder)
        container.append(row) 
        parentContainer.append(container) 
        app.append(parentContainer)

    })
  } else {
    console.log('error')
  }
}

request.send();