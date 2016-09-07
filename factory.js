"use strict"

const fs = require ("fs")


class Cookie{
  constructor(name, ingredients){
    this.name = name
    this.status = "mentah"
    this.ingredient = ingredients
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie{
  constructor(name, ingredients){
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChips extends Cookie{
  constructor(name, ingredients){
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}

class CookieFactory{
  static create(option){

    let temp = []
    for (var i = 0; i < option.length; i++) {
      switch(option[i]) {
          case "peanut butter":
              temp.push(new PeanutButter("peanut butter"))
              break
          case "chocolate chips":
              temp.push(new ChocolateChips("chocolate chips"))
              break
          default:
              temp.push(new Cookie("kue lainnya"))
      }
    }
    return temp
  }
}

class Ingredient{
  construtor(option){
    this.name = option["name"]
    this.amount = option["amount"]
    this.has_gluten = option["has_gluten"]
  }
}

function reset_board() {
   console.log("\x1B[2J")
}

reset_board()

fs.readFile('kue.txt', "utf8", (err, data) => {
  if (err) throw err;
  var tempStr = data.toString().trim().split("\n")
  let batch_of_cookies = CookieFactory.create(tempStr)
  console.log(batch_of_cookies)
});


