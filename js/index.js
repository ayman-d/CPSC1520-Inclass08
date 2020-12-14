window.addEventListener("load", function (e) {
  // use fetch to obtain the data from the json file
  const rentalRequest = fetch("./js/data.json");
  // create the store where all the objects will be kept
  let store = [];

  // use the promises from Fetch to convert the data to json and then spread the array and store it in our Store array, as well as show any errors
  rentalRequest
    .then((response) => response.json())
    .then((data) => {
      store = [...data];
      const rentals = createMarkup();
      displayRentals(rentals);
    })
    .catch((error) => console.warn(`Error: ${error}`));

  // function to create a template for each rental object
  // returns a list of templates to be used for display in the DOM
  const createMarkup = function () {
    // loop through the rental objects and use each one to return a template with the data of the object
    const markup = store.map(function (rental) {
      const imagePath = `./img/thumbnails/${rental.thumbnail}`;
      const template = `
                <aside class="rental">
                    <header>
                        <img class="thumbnail"src="${imagePath}" width="290"height="168" alt="rental accommodation"
                        />
                    </header>
                    <ul class="details">
                        <li class="content">
                            <div>
                                <p class="type">${rental.rentalType}</p>
                                <h3 class="location">${rental.location}</h3>
                            </div>
                            <div class="price">
                                <p><span>$${rental.dailyRate}</span><span>/${rental.currency}</span></p>
                            </div>
                        </li>
                        <li class="rating">
                            <img class="star-icon" src="img/icons/rating.svg"alt="star rating" width="16px" height="16px"
                            />
                            <span>${rental.rating}</span> <span>(${rental.reviews})</span>
                        </li>
                    </ul>
                </aside>
           
            `;
      // create the document fragment from the template
      return document
        .createRange()
        .createContextualFragment(template)
        .querySelector("aside");
    });
    // return the list of templates
    return markup;
  };

  // function to display the list of rentals templates in the DOM
  const displayRentals = function (rentals) {
    // loop through each rental object and append it to our rentals container
    rentals.forEach(function (rental) {
      // grab the container for the rentals display
      const rentalContainer = document.querySelector(".rentals");
      rentalContainer.appendChild(rental);
    });
  };
});
