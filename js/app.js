const overlay = document.querySelector(".overlay");
const articlesContainer = document.getElementById("article-container");

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

request.open("GET", "http://localhost:3000/articles");
request.send();

// update ul

function updateUI(data) {
  const ul = document.createElement("ul");
  const docFrag = document.createDocumentFragment();

  data.forEach((article) => {
    const li = document.createElement("li");
    li.classList.add("card");
    li.innerHTML = `
      <h3>Title: ${article.title}</h3>
      <br />
      <p>Author: ${article.author}</p>
      <br />
      <br />
      <a href=${`./article.html` + `?${article.id}`}>Read More</a>
    `;

    docFrag.appendChild(li);
  });

  ul.appendChild(docFrag);
  articlesContainer.appendChild(ul);
}
