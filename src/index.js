let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000/toys";
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll("input[type=text]");

    let newObj = {
      name: inputs[0].value,
      image: inputs[1].value,
      likes: 0,
    };
    fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((res) => res.json())
      .then((data) => createToyCard(data));
  });
  fetch(`${baseURL}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((newData) => {
        createToyCard(newData);
      });
    });
  function createToyCard(newData) {
    let div = document.createElement("div");
    div.classList.add("card");

    let h2 = document.createElement("h2");
    h2.textContent = newData.name;
    div.appendChild(h2);

    let img = document.createElement("img");
    img.classList.add("toy-avatar");
    img.src = newData.image;
    div.appendChild(img);

    let p = document.createElement("p");
    p.textContent = newData.likes;
    div.appendChild(p);

    let button = document.createElement("button");
    button.classList.add("like-btn");
    button.id = `${newData.id}`;
    button.textContent = "Like";
    div.appendChild(button);

    button.addEventListener("click", () => {
      newData.likes += 1;

      fetch(`${baseURL}/${newData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          likes: newData.likes,
        }),
      })
        .then((res) => res.json())
        .then((data) => (p.textContent = `${newData.likes}`));
    });

    document.querySelector("#toy-collection").appendChild(div);
  }
});
