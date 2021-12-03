// 1 : https://api.themoviedb.org/3/movie/popular?api_key=b971c2f0de8767f08d2bb84160ba24b7&page=1

// 2 : https://api.themoviedb.org/3/movie/top_rated?api_key=b971c2f0de8767f08d2bb84160ba24b7&page=1

// 3 : https://api.themoviedb.org/3/movie/upcoming?api_key=b971c2f0de8767f08d2bb84160ba24b7&page=1

let btns = document.querySelectorAll(".btns");
let btn = document.querySelector(".btn");
let search = document.querySelector("#search");
let min = document.querySelector("#min");
let max = document.querySelector("#max");
let score = document.querySelector("#score");

let main = document.querySelector(".append");

let top2 = "top_rated";

async function kinolar(arg) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${arg}?api_key=b971c2f0de8767f08d2bb84160ba24b7&page=1`
  );

  let res = await response.json();
  main.innerHTML = "";
  console.log(res.results);
  for (let i of res.results) {
    render(i);
  }
  btn.onclick = (event) => {
    main.innerHTML = "";
    if (search.value) {
      for (let i of res.results) {
        if (i.title.includes(search.value)) render(i);
      }
    }
    if (min.value) {
      for (let i of res.results) {
        if (i.release_date.split("-")[0] >= min.value) render(i);
      }
    }
    if (max.value) {
      for (let i of res.results) {
        if (i.release_date.split("-")[0] <= max.value) render(i);
      }
    }
    if (score.value) {
      for (let i of res.results) {
        if (i.vote_average >= score.value) render(i);
      }
    } else {
      for (let i of res.results) {
        render(i);
      }
    }
  };
}

kinolar(top2);

function render(i) {
  let div = document.createElement("div");
  div.className = "movie";
  div.innerHTML = ` <img src="https://image.tmdb.org/t/p/w500${i.poster_path}" alt=${i.original_title}>
                            <div class="movie-info">
                                <h3>${i.title}</h3>
                                <span class="orange">${i.vote_average}</span>
                            </div>
                            <span class="date">${i.release_date}</span>`;
  main.append(div);
}

for (let btn of btns) {
  btn.onclick = (event) => {
    kinolar(btn.value);
    top2 = btn.value;
  };
}
