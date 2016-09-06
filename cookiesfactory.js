var fs = require('fs');

class CookieFactory{
  static create(value) {
    for(let prop in value){
      if(value.includes("peanut")){
        return new peanutButter({
          kueSaya:"Kue isi Kacang Merah",
          bahanUtama: "Isian kacang merah",
        })
      }
      else if(value.includes("chocolate")){
        return new chocolateChip({
          kueSaya:"Kue Coklat Pisang keju",
          bahanUtama: "Pisang dengan toping coklat dan keju",
        })
      }
    }
  }
}

class Cookie {
  constructor(property) {
    this.kueSaya = property['kueSaya']
    this.bahanUtama = property['bahanUtama']
    this.waktuMasak = property['waktuMasak']
    this.kematangan = 0
    this.statusKue = "belum matang"
  }

  masak(waktu){
    for(var i=0;i<waktu;i++){
      this.kematangan+= 3
      this.waktuMasak--
    }

    if(this.kematangan >= 0 && this.kematangan <= 30 ){
      this.statusKue = "raw"
    }
    else if (this.kematangan > 30 && this.kematangan <= 60) {
      this.statusKue = "medium"
    }
    else if (this.kematangan > 60 && this.kematangan <= 100) {
      this.statusKue = "welldone"
    }
    else if (this.kematangan > 100) {
      this.statusKue = "overcooked"
    }
    else{
      this.statusKue = "belum diapa - apain"
    }

    console.log("Kematangan " + this.kueSaya + " sekarang adalah " + this.kematangan + " waktu masak yang tersisa adalah " + this.waktuMasak)
  }
}

class peanutButter extends Cookie {
  constructor(property) {
    super(property)
    this.waktuMasak = 70
  }
}

class chocolateChip extends Cookie {
  constructor(property) {
    super(property)
    this.waktuMasak = 50
  }
}

let kuekacang1 = new peanutButter({
    kueSaya: "Kue isi Kacang Merah",
    bahanUtama: "Isian kacang merah"
})
let kuecoklat1 = new chocolateChip({
    kueSaya: "Kue Coklat Pisang keju",
    bahanUtama: "Pisang dengan toping coklat dan keju"
})

kuekacang1.masak(15) // kematangan = 45, waktu masak = 70 - 15 = 55
kuekacang1.masak(20) // kematangan = 45 + (20*3) = 105, waktu masak = 55 - 20 = 35
console.log(kuekacang1)

kuecoklat1.masak(3) // kematangan = 9, waktu masak = 50 - 3 = 47
console.log(kuecoklat1)

let batchOfCookies = []

var file = fs.readFileSync('bahan.txt').toString().trim().split("\n");
//console.log(file)

for(let i in file){
  batchOfCookies.push(CookieFactory.create(file[i]))
}

for(var i=0; i<batchOfCookies.length;i++){
  console.log(batchOfCookies[i])
}
