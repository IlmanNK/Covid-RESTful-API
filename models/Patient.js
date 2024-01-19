const db = require('../config/database');

// Definisikan kelas Patient untuk merepresentasikan entitas pasien
class Patient {
  // Konstruktor untuk membuat instansi Patient dengan properti yang sesuai
  constructor(patientParams) {
    this.id = patientParams.id;
    this.name = patientParams.name;
    this.phone = patientParams.phone;
    this.address = patientParams.address;
    this.status = patientParams.status || '';
    this.in_date_at = patientParams.in_date_at;
    this.out_date_at = patientParams.out_date_at;
  }

  // Metode untuk mengambil semua data pasien dari database
  static async findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients', (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Mengonversi setiap hasil query menjadi objek Patient dan me-return array
          const patients = results.map(patient => new Patient(patient));
          resolve(patients);
        }
      });
    });
  }

  // Metode untuk membuat data pasien baru di database
static async create(patientParams) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO patients SET ?', patientParams, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.insertId);
      }
    });
  });
}


  // Metode untuk mengupdate data pasien di database berdasarkan ID
  static async update(id, patientParams) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE patients SET ? WHERE id = ?', [patientParams, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  }

  // Metode untuk mencari data pasien berdasarkan ID di database
  static async findByPk(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients WHERE id = ?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Membuat instansi Patient dari hasil query jika ditemukan
          if (results.length > 0) {
            resolve(new Patient(results[0]));
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}

// Eksport kelas Patient untuk digunakan pada file lainnya
module.exports = Patient;
