"use strict"

var fs = require('fs');

class CookieFactory{
  static create(value) {
    for(let prop in value){
      if(value.includes("peanut")){
        return new peanutButter({
          namaKue:"Kue Kacang Numero Dos",
          komposisi: "Kacang ama keju aja",
        })
      }
      else if(value.includes("chocolate")){
        return new chocolateChip({
          namaKue:"Kue Coklat Numero Dos",
          komposisi: "Coklat yang banyak",
        })
      }
    }
  }
}

class Cookie {
  constructor(components) {
    this.namaKue = components['namaKue']
    this.komposisi = components['komposisi']
    this.waktuMasak = components['waktuMasak']
    this.kematangan = 0
    this.statusKue = "belum matang"
  }

  masak(waktu){
    for(var i=0;i<waktu;i++){
      this.kematangan+= 3
      this.waktuMasak--
    }

    if(this.kematangan >= 0 && this.kematangan <= 30 ){
      this.statusKue = "masih mentah"
    }
    else if (this.kematangan > 30 && this.kematangan <= 60) {
      this.statusKue = "hampir masak"
    }
    else if (this.kematangan > 60 && this.kematangan <= 100) {
      this.statusKue = "selesai"
    }
    else if (this.kematangan > 100) {
      this.statusKue = "hangus"
    }
    else{
      this.statusKue = "belum diapa - apain"
    }

    console.log("Kematangan " + this.namaKue + " sekarang adalah " + this.kematangan + " waktu masak yang tersisa adalah " + this.waktuMasak)
  }
}

class peanutButter extends Cookie {
  constructor(components) {
    super(components)
    this.waktuMasak = 70
  }
}

class chocolateChip extends Cookie {
  constructor(components) {
    super(components)
    this.waktuMasak = 50
  }
}

let kuekacang1 = new peanutButter({
    namaKue: "Kue Kacang Numero Uno",
    komposisi: "Kacang yang buanyak"
})
let kuecoklat1 = new chocolateChip({
    namaKue: "Kue Coklat Numero Uno",
    komposisi: "Coklat yang buanyak"
})

kuekacang1.masak(15) // kematangan = 45, waktu masak = 70 - 15 = 55
kuekacang1.masak(20) // kematangan = 45 + (20*3) = 105, waktu masak = 55 - 20 = 35
console.log(kuekacang1)

kuecoklat1.masak(3) // kematangan = 9, waktu masak = 50 - 3 = 47
console.log(kuecoklat1)

let batchOfCookies = []

var file = fs.readFileSync('file.txt').toString().trim().split("\n");
//console.log(file)

for(let i in file){
  batchOfCookies.push(CookieFactory.create(file[i]))
}

for(var i=0; i<batchOfCookies.length;i++){
  console.log(batchOfCookies[i])
}
