const foodData = [
  {
    id: 1,
    name: "Chicken Tikka Masala",
    price: 12.99,
    image: "tikka.jpg",
    link: "./tikka.html",
  },
  {
    id: 2,
    name: "Pad Thai Place",
    price: 15.99,
    image: "thai.jpg",
    link: "./thai.html",
  },
  {
    id: 3,
    name: "Sushi Combo",
    price: 18.99,
    image: "sushi.jpg",
    link: "./sushi.html",
  },
  {
    id: 4,
    name: "Noodles",
    price: 5.99,
    image: "noodle.jpg",
    link: "./noodle.html",
  },
  {
    id: 5,
    name: "Tea and donut",
    price: 4.99,
    image: "tea.jpg",
    link: "./tea.html",
  },
  {
    id: 6,
    name: "Pizza",
    price: 10.99,
    image: "pizza.jpg",
    link: "./pizza.html",
  },
  {
    id: 7,
    name: "Lamb Curry",
    price: 24.99,
    image: "lamb.jpg",
    link: "./lamb.html",
  },
  {
    id: 8,
    name: "Naan",
    price: 2.99,
    image: "naan.jpg",
    link: "./naan.html",
  },
  {
    id: 9,
    name: "Chicken Vindaloo",
    price: 22.99,
    image: "vindaloo.jpg",
    link: "./vindaloo.html",
  },
  {
    id: 10,
    name: "Burger",
    price: 4.99,
    image: "burger.jpg",
    link: "./burger.html",
  },
];

console.log(foodData);
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function openNewPage(url) {
  alert(url);
  window.open(url);
}

function addToCart(id) {
  const itemDetails = foodData.find((food) => {
    if (food.id === id) {
      return true;
    }
  });
  const item = {
    ...itemDetails,
    quantity: 1,
  };
  let localdata;
  if (localStorage.getItem("foods")) {
    localdata = JSON.parse(localStorage.getItem("foods"));
  } else {
    localStorage.setItem("foods", []);
    localdata = [];
  }

  const alreadyExists = localdata.find((food) => {
    if (food.id === id) {
      return true;
    }
  });

  if (alreadyExists) {
    const index = localdata.indexOf(alreadyExists);
    console.log(localdata[index].quantity);
    item.quantity = localdata[index].quantity + 1;
    localdata.splice(index, 1);
  }

  const data = [...localdata, item];
  localStorage.setItem("foods", JSON.stringify(data));
  console.log(JSON.parse(localStorage.getItem("foods")));
}

const shoprow = document.querySelector(".shoprow");
foodData.map((food, i) => {
  let localdata;
  if (localStorage.getItem("foods")) {
    localdata = JSON.parse(localStorage.getItem("foods"));
  } else {
    localStorage.setItem("foods", []);
    localdata = [];
  }

  const html = `   <tr>
  <td>${i + 1}</td>
  <td><a href=${food.link}><button type="button">${food.name}</button></a> </td>
  <td><img src=${food.image} alt=${food.name} width="100" height="100" ></td>
  <td><button type="button" value="Add to Cart" onclick="addToCart(${
    food.id
  })"> ${localdata?.includes(i) ? "remove" : "add"}</button> </td>
</tr>
`;
  return shoprow.insertAdjacentHTML("beforeend", html);
});
console.log(shoprow, foodData);
