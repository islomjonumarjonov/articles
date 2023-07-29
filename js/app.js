const overlay = document.querySelector(".overlay");
const articlesContainer = document.getElementById("article-container");

const getData = async () => {
  overlay.classList.remove("hidden");
  const req = await fetch("http://localhost:3000/articles");

  if (req.status >= 500) {
    overlay.classList.add("hidden");
    throw Error("Server bilan bogliq hatolik");
  } else if (req.status >= 400) {
    overlay.classList.add("hidden");
    throw Error("Page not found");
  }
  const data = await req.json();
  overlay.classList.add("hidden");
  return data;
};

getData()
  .then((data) => {
    updateUI(data);
  })
  .catch((err) => {
    console.log(err.message);
  });

// update ui

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
