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

class Jar {
  constructor() {
    this.cookies = []
  }
}

class CookieFactory {
  static create(options, container) {
    // Creates and returns those cookies
    for (let i = 0; i < options.length; i++) {
      switch (options[i]) {
        case "peanut butter":
        container.cookies.push(new PeanutButter)
        break
        case "chocolate chip":
        container.cookies.push(new ChocolateChip)
        break
        default:
        container.cookies.push(new GenericCookie)
      }
    }
    return true
  }

  static list(container) {
    // Creates and returns those cookies
    return container.cookies
  }
}

// Convert datafile to array
let options = fs.readFileSync("cakes.txt", "utf8").toString().split("\n")

// Remove last blank row in file
options.pop()

// Create Jar container
let jar = new Jar()

// Get batch of cookies
CookieFactory.create(options, jar)

console.log("Cookies belum dimasak:")
console.log(jar.cookies)
console.log("======================")

for (let i = 0; i < jar.cookies.length; i++) {
  jar.cookies[i].bake()
}

console.log("Cookies sudah dimasak:")
console.log(jar.cookies)
console.log("======================")

// Inheritance lebih cocok ketika membuat class yang harus menginherit method dan constructor dari parent class, dan Composition lebih cocok untuk membuat object baru melewati class yang hanya bisa dipanggil oleh Parent Class.
