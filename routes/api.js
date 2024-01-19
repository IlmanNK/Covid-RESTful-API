// import PatientController
const patientController = require('../controllers/PatientController');

// import express
const express = require("express");
// Import objek body dari express-validator
const { body } = require('express-validator');

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */

router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient

// Route untuk menampilkan semua data pasien
router.get('/patients', async (req, res) => {
  await patientController.index(req, res);
});


// Route untuk menangani data dari formulir tambah pasien
router.post('/patients/store', [
  // Validasi input jika diperlukan
  body('name').notEmpty().trim(),
  body('address').notEmpty().trim(),
  body('status').notEmpty().isIn(['Positive', 'Recovered', 'Dead']),
], async (req, res) => {
  await patientController.store(req, res);
});


// route untuk fungsi update (mengupdate data pasien)
router.put('/patients/:id', async (req, res) => {
  await patientController.update(req, res);
});

// route untuk menghapus data pasien
router.delete('/patients/:id', async (req, res) => {
  await patientController.delete(req, res);
});

// route untuk pencarian data pasien berdasarkan nama
router.get('/patients/search', async (req, res) => {
  await patientController.search(req, res);
});

// Route untuk pencarian pasien berdasarkan status "Positive"
router.get('/patients/search/positive', async (req, res) => {
  await patientController.searchPositive(req, res);
});

// Route untuk pencarian pasien berdasarkan status "Recovered"
router.get('/patients/search/recovered', async (req, res) => {
  await patientController.searchRecovered(req, res);
});

// Route untuk mendapatkan resource pasien berdasarkan status "Dead"
router.get('/patients/search/dead', async (req, res) => {
  await patientController.searchDead(req, res);
});


// export router
module.exports = router;
