<!-- Menampilkan daftar pasien -->

<?php include('./partials/header.php'); ?>

<h1>Daftar Pasien</h1>

<a href="/patients/create">Tambah Pasien</a>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nama</th>
      <th>Telepon</th>
      <th>Alamat</th>
      <th>Status</th>
      <th>Tanggal Masuk</th>
      <th>Tanggal Keluar</th>
      <th>Aksi</th>
    </tr>
  </thead>  
  <tbody>
    <?php foreach ($patients['data'] as $patient): ?>
      <tr>
        <td><?= $patient['id'] ?></td>
        <td><?= $patient['name'] ?></td>
        <td><?= $patient['phone'] ?></td>
        <td><?= $patient['address'] ?></td>
        <td><?= $patient['status'] ?></td>
        <td><?= $patient['in_date_at'] ?></td>
        <td><?= $patient['out_date_at'] ?></td>
        <td>
          <a href="/patients/<?= $patient['id'] ?>">Detail</a>
          <a href="/patients/<?= $patient['id'] ?>/edit">Ubah</a>
          <a href="/patients/<?= $patient['id'] ?>/delete">Hapus</a>
        </td>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>

<?php include('./partials/footer.php'); ?>
