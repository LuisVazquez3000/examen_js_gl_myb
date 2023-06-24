const infoUsers = users;
const infoMovies = movies;
const cardContainer = document.getElementById('cardContainer');
cardContainer.classList.add("row", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4");
const btn = document.getElementById('btn-click');
const selected = document.querySelector('#selectInput')
const valueRange = document.querySelector("#value");
const inputRange = document.querySelector("#rangeInput");
const fromDate = document.getElementById('searchDateFrom');
const toDate = document.getElementById('searchDateTo')





function compareRate(array, number) {
  if (number > 0 && number < 3) {
    return newArray = array.filter(e => e.rate > 0 && e.rate < 3)
  } else if (number >= 3 && number < 6) {
    return newArray = array.filter(e => e.rate >= 3 && e.rate < 6)
  } else if (number >= 6 && number <= 10) {
    return newArray = array.filter(e => e.rate >= 6 && e.rate <= 10)
  } else {
    return (newArray = array);
  }
}

function filterDate(arrayMovies, dateFrom, dateTo) {
  let newArray = arrayMovies.filter(movie => {
    dateMovie = new Date(movie.watched).getFullYear();
    console.log(dateMovie);
    return (dateMovie >= new Date(dateFrom).getFullYear() + 1 && dateMovie <= new Date(dateTo).getFullYear() + 1)
  })

  return newArray
}


btn.addEventListener('click', () => {
  console.log(filterDate(infoMovies, fromDate.value, toDate.value));
})


function movieFilter(infoUsers, infoMovies, idUser, fromDate, toDate, rate) {
  const arrayFilter = []


  if (idUser) {
    let userSelected = selectedUser(idUser, infoMovies)
    for (let i = 0; i < userSelected.length; i++) {
      for (let j = 0; j < infoUsers.length; j++) {
        const user = infoUsers[j];
        const movie = userSelected[i];
        if (user.id == movie.userId) {
          let nuevoObj = createObjUser(user, movie);
          arrayFilter.push(nuevoObj)
        }
      }

    }
  } else {
    let result = compareRate(infoMovies, rate)
    let filteredAdvanced = filterDate(result, fromDate, toDate);
    for (let i = 0; i < filteredAdvanced.length; i++) {
      for (let j = 0; j < infoUsers.length; j++) {
        const user = infoUsers[j];
        const movie = filteredAdvanced[i];
        if (user.id == movie.userId) {
          let nuevoObj = createObjUser(user, movie);
          arrayFilter.push(nuevoObj)
        }
      }

    }

  }



  return arrayFilter
}

btn.addEventListener('click', () => {


  loadCards(movieFilter(infoUsers, infoMovies, selected.value, fromDate.value, toDate.value, inputRange.value), cardContainer)

})



function createObjUser(user, movie) {
  let objFiltered = {
    id: user.id,
    username: user.username,
    email: user.email,
    fullAddress: `${user.address.street} - ${user.address.city}`,
    movie: movie.title,
    rate: movie.rate,
    image: movie.image,
    watched: new Date(movie.watched).getFullYear()
  }
  return objFiltered
}


function selectedUser(idUser, arrayMovies) {
  const foundUser = arrayMovies.filter(obj => obj.userId == Number(idUser))
  if (foundUser.length != 0) {
    return (foundUser);
  } else {
    return (arrayMovies);
  }
}






valueRange.textContent = inputRange.value;
inputRange.addEventListener("input", (event) => {
  valueRange.textContent = event.target.value;
});




function loadCards(data, html) {
  html.innerHTML = "";
  if (data.length != 0) {
    for (const item of data) {
      let div = document.createElement('div');
      div.classList.add("gap-3", "p-5", "px-3");
      div.style.width = "20rem";
      div.innerHTML = div.innerHTML = `<a href="#" style="text-decoration:none;">
      <div class="card m-auto col-6 shadowCard" style="width: 18rem;">
      <img src="${item.image}" class="card-img-top my-3 px-2" alt="...">
      <div class="card-body">
        <h5 class="card-title">Movie: ${item.movie}</h5>
        <h5 class="card-title">UserName: ${item.username}</h5>
        <h5 class="card-title">email: ${item.email}</h5>
        <h5 class="card-title">RATE: ${item.rate}</h5>
        <h5 class="card-title">watched: ${item.watched}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div></a>`
      html.appendChild(div);
    }
  }
}
