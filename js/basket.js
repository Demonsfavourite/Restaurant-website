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
const basketrow = document.getElementById("basketrow");
const price = document.getElementById("basket-total");

let total = 0;

const basketItems = JSON.parse(localStorage.getItem("foods"));

const renderBasket = () => {
  basketItems.map((food, i) => {
    const html = `   <tr>
            <td>${i + 1}</td>
            <td><a href=${foodData[food.id - 1].link}><button type="button">${
      foodData[food.id - 1].name
    }</button></a> </td>
            <td>
              ${(foodData[food.id - 1].price * food.quantity).toFixed(2)}</td>
            <td>
            <input id=${food.id} value=${
      food.quantity
    } type="number" min="1" onchange="onPriceChange(${food.id})"/>
            <td><img src=${foodData[food.id - 1].image} alt=${
      foodData[food.id - 1].name
    } width="100" height="100" ></td>
            <td><button type="button"  onclick="removeFromCart(${food.id})"> 
            Remove from Cart</button> </td>
          </tr>
          `;

    total += foodData[food.id - 1].price * food.quantity;
    localStorage.setItem("total", total.toFixed(2));
    price.innerText = total.toFixed(2);
    return basketrow.insertAdjacentHTML("beforeend", html);
  });
  console.log(basketItems);
};
renderBasket();

clearBasketHtml = () => {
  basketrow.innerHTML = "";
  total = 0;
  price.innerText = total;
};
const onPriceChange = (id) => {
  const quantity = document.getElementById(`${id}`).value;
  const food = basketItems.find((food) => food.id === id);
  // const item = {
  //   ...food,
  //   quantity: parseInt(quantity.value),
  // };

  const foodIndex = basketItems.findIndex((food) => {
    if (food.id === id) {
      return true;
    }
  });

  basketItems[foodIndex].quantity = parseInt(quantity);

  localStorage.setItem("foods", JSON.stringify(basketItems));

  clearBasketHtml();
  renderBasket();
};

const removeFromCart = (id) => {
  const localdata = JSON.parse(localStorage.getItem("foods"));
  const food = localdata.find((food) => food.id === id);
  let data;
  const index = localdata.indexOf(food);
  const x = localdata.splice(index, 1);
  data = localdata;
  localStorage.setItem("foods", JSON.stringify(data));
  location.reload();
};

function addToCart(id, quantity) {
  const item = {
    id: id,
    quantity: quantity,
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
    localdata.splice(index, 1);
  }

  const data = [...localdata, item];
  localStorage.setItem("foods", JSON.stringify(data));
  console.log(JSON.parse(localStorage.getItem("foods")));
}

// const quantity = document.querySelectorAll("#quantity");
// if (quantity) {
//   console.log(quantity);
//   quantity.addEventListener("change", (e) => {
//     console.log(e.target.value);
//     addToCart(food.id, e.target.value);
//   });
// }
