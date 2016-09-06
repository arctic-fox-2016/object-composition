"use strict"

const fs = require ("fs")


class Cookie{
  constructor(name){
    this.name = name
    this.status = "mentah"
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie{
  constructor(name){
    super(name)
    this.peanut_count = 100
  }
}

class ChocolateChips extends Cookie{
  constructor(name){
    super(name)
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

function reset_board() {
   console.log("\x1B[2J")
}

reset_board()

fs.readFile('kue.txt', "utf8", (err, data) => {
  if (err) throw err;
  //console.log(data);
  var tempStr = data.toString().trim().split("\n")
  let batch_of_cookies = CookieFactory.create(tempStr)
  console.log(batch_of_cookies)
});



//fs.readfile.toString().trim()
