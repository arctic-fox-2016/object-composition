// Answer These Questions:
//
// - What are essential classes?
// - What attributes will each class have?
// - What interface will each class provide?
// - How will the classes interact with each other?
// - Which classes will inherit from others, if any?
//
//
// Your code here
let fs = require('fs')

class Cookies {
  constructor(kue){
    this._waktuPanggang = 20
    this._hargaAdonan = kue.hargaAdonan
    this._bahan = kue.bahan
    this._status = "mentah"
    this._kalori = kue.kalori
  }

  panggang(){
    this._status = "sedang dipanggang"
  }

  angkatKue(){
    this._status = "selesai dipanggang"
  }

  cetak(){
    console.log("Kue ini harganya ", this._hargaAdonan, ", bahannya ", this._bahan, ", status: ", this._status)
  }


}

class KueKacang extends Cookies {
  constructor(kue){
    super(kue)
    this._tambahan = 'kacang'
    this._warna = 'brown'
    this._kacang = 300
    this._coklat = 20
    this._terigu = 1000
  }
  cetak(){
    super.cetak()
    console.log("tambahannya: ", this._tambahan, "dengan warna cookies" , this._warna)
  }
}

class KueCoklat extends Cookies {
  constructor(kue){
    super(kue)
    this._tambahan = 'coklat'
    this._warna = 'black'
    this._kacang = 200
    this._coklat = 300
    this._terigu = 1000
  }
  cetak(){
    super.cetak()
    console.log("tambahannya: ", this._tambahan, "dengan warna cookies" ,this._warna)
  }

}

class KumpulanKue {
  constructor(){
    this._kumpulan = []
    this._kalori = 0
  }

  mendataKue(object){
    this._kumpulan.push(object)
  }

}

class CookieFactory{
  constructor(){
    this.kuekue = []
    this.arrayBahan = fs.readFileSync("contoh.txt", "utf8").toString().split("\n")
    this._kalori = 0
    this._coklat = 0
    this._kacang = 0
    this._terigu = 0
  }

  buatKue(){
    for (let idx in this.arrayBahan){
      if (this.arrayBahan[idx] == "kacang"){
        this.kuekue.push(new KueKacang({hargaAdonan: 7000, bahan: "kacang", kalori: 100}))
      } else if(this.arrayBahan[idx] == "coklat"){
        this.kuekue.push(new KueCoklat({hargaAdonan: 10000, bahan: "coklat", kalori: 200}))
      }
    }
  }

  printKalori(){
    for (let idx in this.kuekue){
      this._kalori = this._kalori + this.kuekue[idx]._kalori
    }
    return this._kalori
  }

  printIngredients(){
    for (let idx in this.kuekue){
      this._coklat = this._coklat + this.kuekue[idx]._coklat
      this._kacang = this._kacang + this.kuekue[idx]._kacang
      this._terigu = this._terigu + this.kuekue[idx]._terigu
    }
    console.log("Untuk membuat kue kue yang anda inginkan, anda membutuhkan coklat sebanyak ", this._coklat, "gram, kacang sebanyak ", this._kacang, "gram, terigu sebanyak ", this._terigu, "gram")
  }

  printKueKue(){
    console.log("Kue yang anda ingin buat: ")
    for (let idx in this.kuekue){
      let idxmod = parseInt(idx) +1
      console.log(idxmod, " kue ", this.kuekue[idx]._tambahan)
    }
  }
}


// Driver Code
let kuekueku = new KumpulanKue()
let cookiefactory = new CookieFactory()
cookiefactory.buatKue()
console.log(cookiefactory.kuekue)
cookiefactory.printKueKue()
cookiefactory.printIngredients()
