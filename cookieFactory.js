"use strict"
const fs = require('fs');

class Ingredient {
  constructor(options) {
    this._list = [];
    for (let idx = 0; idx < options.length; idx++) {
      this._list[idx] = {};
      this._list[idx]["name"] = options[idx]["name"];
      this._list[idx]["amount"] = options[idx]["amount"];
      this._list[idx]["has_gluten"] = options[idx]["has_gluten"];
    }
  }
  get list() {
    return this._list;
  }
}

class Cookie {
  constructor() {
    this._name = null;
    this._status = "mentah"
    this._sugar = 0
    this._cinnamon = 0
    this._ingredients = null;
  }
  get name() {
    return this._name;
  }
  get ingredients() {
    return this._ingredients;
  }
  bake() {
    this._status = "selesai dimasak"
  }
  getSugar() {
    if (this._sugar == 0) return true;
    return false;
  }
}

class PeanutButter extends Cookie {
  constructor(property = {}) {
    super(property)
    this._name = "Peanut Butter";
    this._peanut_count = property["peanut_count"] || 100
    this._sugar = property["sugar"] || 0
    this._cinnamon = property["cinnamon"] || 75
    this._ingredients = new Ingredient([{
      name: "Flour",
      amount: "2 Cups",
      has_gluten: true
    }, {
      name: "Sugar",
      amount: "2 Cups",
      has_gluten: false
    }, {
      name: "Cinnamon",
      amount: "1 Cup",
      has_gluten: false
    }, ]);
  }
}

class ChocolateChip extends Cookie {
  constructor(property = {}) {
    super(property)
    this._name = "Chocolate Chip";
    this._choc_chip_count = property["choco_count"] || 200
    this._sugar = property["sugar"] || 200
    this._cinnamon = property["cinnamon"] || 150
    this._ingredients = new Ingredient([{
      name: "Flour",
      amount: "2 Cups",
      has_gluten: true
    }, {
      name: "Sugar",
      amount: "2 Cups",
      has_gluten: false
    }, {
      name: "Cinnamon",
      amount: "1 Cup",
      has_gluten: false
    }, ]);
  }
}

class RegularCookie extends Cookie {
  constructor(property = {}) {
    super(property)
    this._name = "Regular Cookie";
    this._choc_chip_count = property["choco_count"] || 120
    this._sugar = property["sugar"] || 150
    this._cinnamon = property["cinnamon"] || 230
    this._ingredients = new Ingredient([{
      name: "Flour",
      amount: "2 Cups",
      has_gluten: true
    }, {
      name: "Sugar",
      amount: "2 Cups",
      has_gluten: false
    }, {
      name: "Cinnamon",
      amount: "1 Cup",
      has_gluten: false
    }, ]);
  }
}

class CookieFactory {
  static create(options) {
      //list of cookie types and return thoose cookies
      let cookies = [];

      for (let idx = 0; idx < options.length; idx++) {
        switch (options[idx].toLowerCase()) {
        case "peanut butter":
          let peanutbutter = new PeanutButter();
          cookies.push(peanutbutter);
          break;
        case "chocolate chocolatechip":
          let chocochip = new ChocolateChip();
          cookies.push(chocochip);
          break;
        default:
          let regularcookie = new RegularCookie();
          cookies.push(regularcookie);
        }
      }
      return cookies;
    }
    //define other methods as needed
}

//contoh driver code
//sesuaikan dengan model inheritance
//import daftar kue dari file

let batch_of_cookies = CookieFactory.create(fs.readFileSync('./kue.txt', 'utf8').toString().trim().split(/\r|\n/));
//CookieFactory.cookies()

console.log("\n\nList Cookie Factory:")
console.log(batch_of_cookies)
console.log("\n\nAll food that have no sugar:")
  //console food without sugar
for (let idx = 0; idx < batch_of_cookies.length; idx++) {
  if (batch_of_cookies[idx].getSugar()) {
    console.log((idx + 1).toString() + ". " + batch_of_cookies[idx].name)
  }
}
//ingredient of cookies and print randomly
if (batch_of_cookies.length > 0) {
  let batch_of_cookies_index = Math.floor(Math.random() * batch_of_cookies.length)
  console.log("\n\nIngredients of " + batch_of_cookies[batch_of_cookies_index].name + ":")

  let ingredient_list = batch_of_cookies[batch_of_cookies_index].ingredients.list

  for (let idx = 0; idx < ingredient_list.length; idx++) {
    console.log((idx + 1).toString() + ". Name       : " + ingredient_list[idx].name)
    console.log("   Amount     : " + ingredient_list[idx].amount)
    console.log("   Has Gluten : " + ((ingredient_list[idx].has_gluten) ? "Yes" : "No").toString())
  }
}
console.log("\n\n")
