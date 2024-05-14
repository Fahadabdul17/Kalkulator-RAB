function formatCurrency(amount) {
  return (
    "Rp. " +
    amount.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function parseCurrency(value) {
  value = value
    .replace(/Rp\.\s?/, "")
    .replace(/\./g, "")
    .replace(",", ".");
  return parseFloat(value);
}

// Hitung total tenaga kerja
function hitungTotalTenagaKerja() {
  var total = 0;
  for (var i = 1; i <= 4; i++) {
    var jumlah = document.getElementById("jumlah" + i).textContent;
    var harga = parseCurrency(jumlah);
    if (!isNaN(harga)) {
      total += harga;
    }
  }
  document.getElementById("total-tenaga-kerja").textContent =
    formatCurrency(total);
}

// Hitung total bahan
function hitungTotalBahan() {
  var total = 0;
  for (var i = 5; i <= 8; i++) {
    var jumlahHargaCell = document.getElementById("jumlah" + i);
    if (jumlahHargaCell) {
      var jumlah = jumlahHargaCell.textContent;
      var harga = parseCurrency(jumlah);
      if (!isNaN(harga)) {
        total += harga;
      }
    }
  }
  document.getElementById("total-bahan").textContent = formatCurrency(total);
}

// Hitung jumlah harga (koefisien x harga satuan)
function hitungJumlahHarga(koefisien, hargaSatuan) {
  return koefisien * hargaSatuan;
}

// Event listeners for inputs
var inputsTenagaKerja = document.querySelectorAll(
  'tr.tenaga-kerja input[type="number"]'
);
inputsTenagaKerja.forEach(function (input, index) {
  input.addEventListener("input", function () {
    var koefisienCell =
      input.parentNode.previousElementSibling.previousElementSibling;
    var koefisien = parseFloat(koefisienCell.textContent);
    var hargaSatuan = parseFloat(
      input.value.replace(/[^\d,.-]/g, "").replace(",", ".")
    );
    var jumlahHarga = hitungJumlahHarga(koefisien, hargaSatuan);
    var jumlahHargaCell = document.getElementById("jumlah" + (index + 1));
    jumlahHargaCell.textContent = formatCurrency(jumlahHarga);
    hitungTotalTenagaKerja();
    hitungJumlahHargaKeseluruhan();
    hitungOverheadProfit();
    hitungHargaSatuanPekerjaan();
  });
});

var inputsBahan = document.querySelectorAll('tr.bahan input[type="number"]');
inputsBahan.forEach(function (input, index) {
  input.addEventListener("input", function () {
    var koefisienCell =
      input.parentNode.previousElementSibling.previousElementSibling;
    var koefisien = parseFloat(koefisienCell.textContent);
    var hargaSatuan = parseFloat(
      input.value.replace(/[^\d,.-]/g, "").replace(",", ".")
    );
    var jumlahHargaCell = document.getElementById("jumlah" + (index + 5));
    if (jumlahHargaCell) {
      var jumlahHarga = hitungJumlahHarga(koefisien, hargaSatuan);
      jumlahHargaCell.textContent = formatCurrency(jumlahHarga);
      hitungTotalBahan();
      hitungJumlahHargaKeseluruhan();
      hitungOverheadProfit();
      hitungHargaSatuanPekerjaan();
      hitungHargaSatuanPekerjaanDibulatkan();
    }
  });
});

// Hitung total jumlah harga keseluruhan (A + B + C)
function hitungJumlahHargaKeseluruhan() {
  var totalTenagaKerja = parseCurrency(
    document.getElementById("total-tenaga-kerja").textContent
  );
  var totalBahan = parseCurrency(
    document.getElementById("total-bahan").textContent
  );

  if (isNaN(totalTenagaKerja)) totalTenagaKerja = 0;
  if (isNaN(totalBahan)) totalBahan = 0;

  var totalKeseluruhan = totalTenagaKerja + totalBahan;
  document.getElementById("jumlah-harga-keseluruhan").textContent =
    formatCurrency(totalKeseluruhan);
}

// Hitung overhead dan profit (11% x D)
function hitungOverheadProfit() {
  var totalJumlahHargaKeseluruhan = parseCurrency(
    document.getElementById("jumlah-harga-keseluruhan").textContent
  );
  var total = 0.11 * totalJumlahHargaKeseluruhan;
  document.getElementById("overhead-profit").textContent =
    formatCurrency(total);
}

// Hitung harga satuan pekerjaan (D + E)
function hitungHargaSatuanPekerjaan() {
  var totalJumlahHargaKeseluruhan = parseCurrency(
    document.getElementById("jumlah-harga-keseluruhan").textContent
  );
  var totalOverheadProfit = parseCurrency(
    document.getElementById("overhead-profit").textContent
  );
  var total = totalJumlahHargaKeseluruhan + totalOverheadProfit;
  document.getElementById("harga-satuan-pekerjaan").textContent =
    formatCurrency(total);
}

function hitungHargaSatuanPekerjaanDibulatkan() {
  var hargaSatuanPekerjaan = parseCurrency(
    document.getElementById("harga-satuan-pekerjaan").textContent
  );
  var hargaSatuanPekerjaanDibulatkan = Math.round(hargaSatuanPekerjaan);
  document.getElementById("harga-satuan-pekerjaan-dibulatkan").textContent =
    formatCurrency(hargaSatuanPekerjaanDibulatkan);
}

// Initial calculations when the document is ready
document.addEventListener("DOMContentLoaded", function () {
  hitungTotalTenagaKerja();
  hitungTotalBahan();
  hitungJumlahHargaKeseluruhan();
  hitungOverheadProfit();
  hitungHargaSatuanPekerjaan();
  hitungHargaSatuanPekerjaanDibulatkan();
});
