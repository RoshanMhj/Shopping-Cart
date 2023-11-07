/* Variable Declaration */

let shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "32113213",
    name: "Casual Shirt",
    price: "45$",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
    img: "./Images/img-1.jpg",
  },
  {
    id: "35113123",
    name: "Office Shirt",
    price: "50$",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
    img: "./Images/img-2.jpg",
  },
  {
    id: "32115423",
    name: "T Shirt",
    price: "15$",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
    img: "./Images/img-3.jpg",
  },
  {
    id: "32111234",
    name: "Office Suit",
    price: "500$",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
    img: "./Images/img-4.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;

      let search = basket.find((x) => x.id === id) || [];

      return `
    <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));

  update(id);

  //console.log(basket);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === id);

  if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));

  update(id);

  //console.log(basket);
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  itemCalculation();
};

let itemCalculation = () => {
  let cartIcon = document.getElementById("cartAmount");

  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
