"use strict"
class Lemari{
  constructor(component){
    this._kacang = component['kacang']
    this._coklat = component['coklat']
    this._kue    = []
    this._telur = component['telur']
    this._tepung = component['tepung']
  }

  stockLemari() {
    console.log("============================")
    console.log("         STOK LEMARI        ")
    console.log("============================")
    console.log("Kacang : " +this._kacang +" Gram")
    console.log("Coklat : " +this._coklat +" Gram")
    console.log("Telur  : " +this._telur +" Butir")
    console.log("Tepung : " +this._tepung +" Tepung")
  }
}

class Kue extends Lemari{
  constructor(component) {
    super(component)
    this._namaKue   = component['namaKue']
    this._statusKue = component['statusKue']
    this._waktuTotal= 0
    console.log("============================")
    console.log("Kita akan membuat "+this._namaKue)
    console.log("============================")
    console.log("Bahan Kue " +this._namaKue+ " : ")
    console.log("     - Kacang : "+this._kacang+ " Gram")
    console.log("     - Coklat : "+this._coklat+ " Gram")
    console.log("     - Telur : "+this._telur+ " Butir")
    console.log("     - Tepung : "+this._tepung+ " Gram")
    console.log("============================")
  }
  ambilBahan() {
    console.log("============================")
    console.log("--------AMBIL BAHAN()-------")
    console.log("============================")
    lemariKita._coklat -= this._coklat
    lemariKita._kacang -= this._kacang
    lemariKita._telur -= this._telur
    lemariKita._tepung -= this._tepung
  }
  adonanKue() {
    this._statusKue = "Kue Sedang Di Masukkan dalam Adonan, Status : Mentah"
    this._waktuTotal += this._waktuAdonan
    console.log(this._statusKue)
    console.log("----Waktu Sudah Berjalan : " + this._waktuTotal+ " Menit")

  }



  kueMatang(){
    this._statusKue = "Saatnya Mengeluarkan Dari Panggangan"
    this._waktuTotal += this._waktuPanggang
    console.log(this._statusKue)
    console.log("----Waktu Sudah Berjalan : " + this._waktuTotal+ " Menit")
  }

  panggangKue(component){
    this._waktuPanggangUser = component['waktuPanggangUser']
    if(this._waktuPanggangUser>this._waktuPanggang){
        this._statusKue = "Hangus"
        this._waktuTotal += this._waktuPanggangUser
    }
    else if(this._waktuPanggangUser<0.5*this._waktuPanggang){
      this._statusKue = "Mentah"
      this._waktuTotal += this._waktuPanggangUser
    }
    else if(this._waktuPanggangUser>=0.5*this._waktuPanggang&& this._waktuPanggangUser<this._waktuPanggang){
      this._statusKue = "Hampir Matang"
      this._waktuTotal += this._waktuPanggangUser
    }
    else{
      this._statusKue = "Matang"
      this._waktuTotal += this._waktuPanggang
    }
    console.log("Status Kue Anda Adalah : "+ this._statusKue)
    console.log("----Waktu Sudah Berjalan : " + this._waktuTotal+ " Menit")
  }
}

class KueCoklat extends Kue{
  constructor(component){
    super(component)
    this._waktuAdonan   = 10
    this._waktuPanggang = 90
  }
}

class KueKacang extends Kue{
  constructor(component){
    super(component)
    this._waktuAdonan   = 30
    this._waktuPanggang = 120
  }
}

class CookieFactory{
  static create(namaKue) {
    for(let idx in namaKue){
      if(namaKue.includes("peanut"))
        return new KueKacang({
          kacang:220,
          coklat:0,
          telur :3,
          tepung:90,
          namaKue:"Peanut Butter Crumbled"
        })
        else if(namaKue.includes("chocolate"))
          return new KueCoklat({
            kacang:0,
            coklat:500,
            telur :6,
            tepung:100,
            namaKue:"Chocolate Butter Crumbled"
          })
    }
  }
}
let batch_of_cookies = []
var fs = require('fs')
var listKue = fs.readFileSync('listKue.txt')
  .toString()
  .split("\n")
console.log(listKue);


for(let idx in listKue){
  batch_of_cookies.push(CookieFactory.create(listKue[idx]))
}
//let batch_of_cookis = factory.create(listKue)
