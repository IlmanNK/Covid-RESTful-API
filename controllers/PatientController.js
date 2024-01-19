// Import Model Patient
const Patient = require('../models/Patient');
const { validationResult } = require('express-validator');

// Class PatientController untuk mengelola logika bisnis terkait Pasien
class PatientController {
  // Metode untuk menampilkan semua data pasien
  async index(req, res) {
    try {
      const patients = await Patient.findAll();

      if (!patients.length) {
        return res.status(200).json({
          message: 'Data is empty'
        });
      }

      res.status(200).json({
        message: 'Get All Patients',
        data: patients  
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Server Error'
      });
    }
  }

  // Metode untuk membuat data pasien baru
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'All fields must be filled correctly',
        errors: errors.array(),
      });
    }

    const response = await this.savePatient(req.body);
    return res.status(response.code).json(response.data);
  }

  // Metode internal untuk menyimpan data pasien baru
  async savePatient(patientParams) {
    try {
      const patient = await Patient.create(patientParams);

      return {
        code: 201,
        data: {
          message: 'Patient created successfully',
          data: patient,
        }
      };

    } catch (error) {
      return {
        code: 500,
        data: {
          message: 'Error creating patient',
        }
      };
    }
  }

  // Metode untuk mengupdate data pasien
  async update(req, res) {
    const { id } = req.params;
    const response = await this.updatePatient(id, req.body);
    return res.status(response.code).json(response.data);
  }

  // Metode internal untuk mengupdate data pasien
  async updatePatient(id, patientParams) {
    try {
      const [updatedRows] = await Patient.update(patientParams, {
        where: { id }
      });

      if (updatedRows > 0) {
        const updatedPatient = await Patient.findByPk(id);
        return {
          code: 200,
          data: {
            message: 'Patient updated successfully',
            data: updatedPatient
          }
        };
      } else {
        return {
          code: 404,
          data: {
            message: 'Patient not found'
          }
        };
      }

    } catch (error) {
      return {
        code: 500,
        data: {
          message: 'Error updating patient'
        }
      };
    }
  }

  // Metode untuk menghapus data pasien
  async delete(req, res) {
    const { id } = req.params;
    const response = await this.destroyPatient(id);
    return res.status(response.code).json(response.data);
  }

  // Metode internal untuk menghapus data pasien
  async destroyPatient(id) {
    try {
      const deletedRows = await Patient.destroy({
        where: { id }
      });

      if (deletedRows > 0) {
        return {
          code: 200,
          data: {
            message: 'Patient deleted successfully'
          }
        };
      } else {
        return {
          code: 404,
          data: {
            message: 'Patient not found'
          }
        };
      }

    } catch (error) {
      return {
        code: 500,
        data: {
          message: 'Error deleting patient'
        }
      };
    }
  }

  // Metode untuk menampilkan detail pasien berdasarkan ID
  async show(req, res) {
    const { id } = req.params;
    const response = await this.getPatientDetail(id);
    return res.status(response.code).json(response.data);
  }

  // Metode internal untuk mendapatkan detail pasien berdasarkan ID
  async getPatientDetail(id) {
    try {
      const patient = await Patient.findByPk(id);

      if (patient) {
        return {
          code: 200,
          data: {
            message: 'Patient details retrieved successfully',
            data: patient
          }
        };
      } else {
        return {
          code: 404,
          data: {
            message: 'Patient not found'
          }
        };
      }

    } catch (error) {
      return {
        code: 500,
        data: {
          message: 'Error retrieving patient details'
        }
      };
    }
  }

  // Metode untuk melakukan pencarian data pasien berdasarkan nama
  async search(req, res) {
    const { name } = req.query;

    try {
      // Menjalankan query pencarian berdasarkan nama
      const patients = await Patient.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%` // Menggunakan ILIKE untuk pencarian case-insensitive
          }
        }
      });

      if (!patients.length) {
        return res.status(404).json({
          message: 'No matching patients found'
        });
      }

      return res.status(200).json({
        message: 'Search results',
        data: patients
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error searching patients'
      });
    }
  }

  // Metode untuk mencari data pasien berdasarkan status "Positive"
async searchPositive(req, res) {
  try {
    const patients = await Patient.findAll({
      where: {
        status: 'Positive'
      }
    });

    if (!patients.length) {
      return res.status(404).json({
        message: 'No positive patients found',
        total: 0,
        data: []
      });
    }

    return res.status(200).json({
      message: 'Get positive patients',
      total: patients.length,
      data: patients
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error searching positive patients'
    });
  }
}

// Metode untuk mencari data pasien berdasarkan status "Recovered"
async searchRecovered(req, res) {
  try {
    const patients = await Patient.findAll({
      where: {
        status: 'Recovered'
      }
    });

    if (!patients.length) {
      return res.status(404).json({
        message: 'No recovered patients found',
        total: 0,
        data: []
      });
    }

    return res.status(200).json({
      message: 'Get recovered patients',
      total: patients.length,
      data: patients
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error searching recovered patients'
    });
  }
}

// Metode untuk mencari data pasien berdasarkan status "Dead"
async searchDead(req, res) {
  try {
    const patients = await Patient.findAll({
      where: {
        status: 'Dead'
      }
    });

    if (!patients.length) {
      return res.status(404).json({
        message: 'No dead patients found',
        total: 0,
        data: []
      });
    }

    return res.status(200).json({
      message: 'Get dead patients',
      total: patients.length,
      data: patients
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error searching dead patients'
    });
  }
}


}

// Membuat objek instance dari PatientController
const patientController = new PatientController();

// Mengekspor objek instance
module.exports = patientController;
