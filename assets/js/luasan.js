
    function hitungLuasan() {
      var panjang = parseFloat(document.getElementById('panjang').value);
      var lebar = parseFloat(document.getElementById('lebar').value);
      var sudut = parseFloat(document.getElementById('sudut').value);
      var overstek = parseFloat(document.getElementById('overstek').value);

      // Konversi sudut ke radian
      var sudutRadian = sudut * Math.PI / 180;

      // Hitung luasan
      var luasan = ((panjang + 2 * overstek) * (lebar + 2 * overstek)) / Math.cos(sudutRadian);

      // Tampilkan hasil
      document.getElementById('luasan').innerHTML = luasan.toFixed(2);
    }

    // Panggil fungsi hitungLuasan() saat input berubah
    document.getElementById('panjang').addEventListener('input', hitungLuasan);
    document.getElementById('lebar').addEventListener('input', hitungLuasan);
    document.getElementById('sudut').addEventListener('input', hitungLuasan);
    document.getElementById('overstek').addEventListener('input', hitungLuasan);

    // Hitung luasan saat halaman dimuat
    hitungLuasan();