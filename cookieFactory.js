"use strict"
let fs = require('fs')

class Ingredient
{
    constructor(options){
    this.name = options['name']
    this.bahan = options['bahan']
    this.amount = options['amount']
    this.haveSugar = options['haveSugar']
    this.haveCinnamon = options['haveCinnamon']
    this.sugar = options['sugar'] || 0
  }
}

class Cookie extends Ingredient
{
  constructor(options){
    super(options)
    this.status = "mentah"
  }

  bake(){
    this.status = "selesai dimasak"
  }
  isHaveSugar(){
    return this.haveSugar
  }
}

// class PeanutCookie extends Cookie
// {
//   constructor()
//   {
//     super()
//     this.peanut_count = 100
//     super.haveSugar = true
//     super.sugar = 30
//     super.havecinamon = true
//
//   }
// }
//
// class Chocochip extends Cookie
// {
//   constructor()
//   {
//     super()
//     this.choc_chip_count = 200
//     super.sugar = 35
//     super.haveSugar = true
//   }
// }
// class Baguette extends Cookie
// {
//   constructor()
//   {
//     super()
//     this.baguette_count = 200
//   }
// }

class CookieFactory{

  static create(options)
  {
    let cookies = [];
    let ingredients = [];
    for(let idx = 0; idx < options.length; idx++){
      ingredients.push(options[idx].bahan)
      let havesugar = options[idx].bahan.indexOf("gula") >=0
      let cinnamon = options[idx].bahan.indexOf("cinnamon") >=0
      switch (options[idx].name.toLowerCase()) {
        case "kue kacang":
          //let kacang = new PeanutCookie()
            let kacang = new Cookie({name:"kue kacang",
            bahan: options[idx].bahan,
            amount: 2,
            sugar:30,
            haveSugar:havesugar,
            haveCinnamon:cinnamon})
          cookies.push(kacang)
          break;
        case "kue coklat":
          //let coklat = new Chocochip()
            let coklat = new Cookie({name:"kue coklat",
            bahan: options[idx].bahan,
            amount : 3,
            sugar:35,
            haveSugar:havesugar,
            haveCinnamon:cinnamon})
          cookies.push(coklat)
          break;
          case "baguette non-sugar":
            // let baguette = new Baguette()
            let baguette = new Cookie({name:"baguette non-sugar",
            bahan: options[idx].bahan,
            amount: 1,
            sugar:0,
            haveSugar:havesugar,
            haveCinnamon:cinnamon})
            cookies.push(baguette)
            break;
        default:
      }
    }
    return cookies;
  }
}


let options = fs.readFileSync('indregients.txt')
.toString()
.split("\n")
.map(function(indregient){
  let indregientArr = indregient.split("=")
  let namaKue = indregientArr.splice(0,1).toString().trim()
  let bahan = indregientArr.splice(0,1).toString().trim()
  return {name: namaKue,bahan:bahan}
})
let batch_of_cookies = CookieFactory.create(options)
for (var cookie in batch_of_cookies) {
  let kue = batch_of_cookies[cookie]
  console.log(`membuat ${kue.name}`)
  console.log(`bahan = ${kue.bahan}`)
  kue.bake()
  console.log(`${kue.name} ${kue.status}`)
}
//console.log(batch_of_cookies)
