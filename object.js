"use strict"

let fs = require("fs")

class Cookie {
  constructor() {
    this.status = "mentah"
  }
  bake() {
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(options) {
    super(options)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(options) {
    super(options)
    this._choc_chip_count = 200
  }
}

class GenericCookie extends Cookie {
  constructor(options) {
    super(options)
  }
}

class CookieFactory {
  static create(options) {
    // Accepts a list of cookie types
    this.options = options
    this.cookies = []

    // Creates and returns those cookies
    for (let i = 0; i < this.options.length; i++) {
      switch (this.options[i]) {
        case "peanut butter":
        this.cookies.push(new PeanutButter)
        break
        case "chocolate chip":
        this.cookies.push(new ChocolateChip)
        break
        default:
        this.cookies.push(new GenericCookie)
      }
    }

    return this.cookies
  }

  // Define other methods as needed
  get inspect() {
    return this.status
  }
}

// Convert datafile to array
let options = fs.readFileSync("cakes.txt", "utf8").toString().split("\n")

// Remove last blank row in file
options.pop()

// Get batch of cookies
let batch_of_cookies = CookieFactory.create(options)

console.log("Cookies belum dimasak:\n" + batch_of_cookies + "\n==========")

for (let i = 0; i < batch_of_cookies.length; i++) {
  batch_of_cookies[i].bake()
}

console.log("Cookies sudah dimasak:\n" + batch_of_cookies + "\n==========")

// Inheritance lebih cocok ketika membuat class yang harus menginherit method dan constructor dari parent class, dan Composition lebih cocok untuk membuat object baru melewati class yang hanya bisa dipanggil oleh Parent Class.
