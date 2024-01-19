<!-- Formulir tambah pasien -->

<?php include('./partials/header.php'); ?>

<h1>Tambah Pasien</h1>

<form action="/patients/store" method="post">
  <label for="name">Nama:</label>
  <input type="text" name="name" required>
  <br>

  <label for="address">Alamat:</label>
  <input type="text" name="address" required>
  <br>

  <label for="status">Status:</label>
  <select name="status" required>
    <option value="Positive">Positive</option>
    <option value="Recovered">Recovered</option>
    <option value="Dead">Dead</option>
  </select>
  <br>

  <button type="submit">Simpan</button>
</form>

<?php include('./partials/footer.php'); ?>
