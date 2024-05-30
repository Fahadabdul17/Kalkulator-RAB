function hitungBiaya() {
  const panjang = parseFloat(document.getElementById('panjang').value);
  const lebar = parseFloat(document.getElementById('lebar').value);
  const isiGenteng = parseFloat(document.getElementById('isi-genteng').value);
  const hargaGenteng = parseFloat(document.getElementById('harga-genteng').value);
  const overstek = parseFloat(document.getElementById('overstek').value);
  const sudut = parseFloat(document.getElementById('sudut').value);

  const luasBangunan = ((panjang + (overstek * 2)) * (lebar + (overstek * 2))) / Math.cos(sudut * Math.PI / 180);
  const jumlahGenteng = Math.round(luasBangunan * isiGenteng);
  const totalBiaya = Math.round(jumlahGenteng * hargaGenteng);

  document.getElementById('hasil').innerHTML = `Luas bangunan: ${luasBangunan.toFixed(2)} meter persegi, membutuhkan genteng sebanyak ${jumlahGenteng} buah/biji, dengan perkiraan biaya sebesar Rp${totalBiaya.toLocaleString()}`;
}