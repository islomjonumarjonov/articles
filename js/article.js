const idEl = document.getElementById("id");
const overlay = document.querySelector(".overlay");

const qurey = window.location.search;
const id = qurey.slice(1);

const articlesContainer = document.getElementById("article-container");

idEl.textContent = id;

const request = new XMLHttpRequest();

request.addEventListener("readystatechange", () => {
  if (request.readyState == 4 && request.status == 200) {
    const data = JSON.parse(request.responseText);
    updateUI(data);
    overlay.classList.add("hidden");
  } else if (request.readyState == 4) {
    console.log("error");
    overlay.classList.add("hidden");
  } else {
    overlay.classList.remove("hidden");
  }
});

request.open("GET", `http://localhost:3000/articles/${id}`);
request.send();

function updateUI(data) {
  const ul = document.createElement("ul");
  const docFrag = document.createDocumentFragment();
  const li = document.createElement("li");
  li.classList.add("card");
  li.innerHTML = `
      <img height=350 src="${data.image}" alt="">
      <h3>Title: ${data.title}</h3>
      <br />
      <p>Author: ${data.author}</p>
      <br />
      <p>Body: ${data.body}</p>
      <br />
      <a href=${`./index.html`}>Back to main page</a>
    `;
  docFrag.appendChild(li);
  ul.appendChild(docFrag);
  articlesContainer.appendChild(ul);
}
