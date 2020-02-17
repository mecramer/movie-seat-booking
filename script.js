// select the DOM elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

// run function to get seats and movie if saved in local storage
populateUI();

// the plus sign turns from a string to number
let ticketPrice = +movieSelect.value;

// Save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  // create a node list of all the selected seats
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // console.log(selectedSeats)

  // Copy selected seats into array
  // Map through array
  // return new array through indexes
  // using spread operator to copy selectedSeats
  // map returns and array whereas forEach loops through an array
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // console.log(seatsIndex);

  // save the seats to local storage
  // because seatsIndex is an array, it needs to have JSON.stringify run on it
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


  // get the number of seats selected
  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount);

  // apply the numbers to pages seat and price counts
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
  // get selected seats from local storage, and it has to be un stringified
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // if seats exist in storage, add them back through the selected class
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  // get the movie (by index of the select) from local storage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  // if it exists in local storage, set that to the current selectMovieIndex
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Event listeners

// Movie select event
// when movie choice changes, update the tickePrice and rerun the updateSelectedCount function
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  // console.log(e.target.selectedIndex, e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  // console.log(e.target);

  // check if the clicked element has a class of seat
  // AND does not contain class of occupied
  // this way this if only runs when seats that are unoccupied are clicked
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    // console.log(e.target);

    // clicking on the unoccupied seat will give it a class of selected
    e.target.classList.toggle('selected');

    // call a function to update the count and dollar numbers for selected seats
    updateSelectedCount();
  }
});

// Inital count and total
updateSelectedCount();