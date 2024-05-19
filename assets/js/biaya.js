function formatRupiah(amount) {
  return 'Rp. ' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00', '');
}

function calculateTotal() {
  // Get the input values
  const volume = parseFloat(document.getElementById('volume1').value) || 0;
  const price = parseFloat(document.getElementById('harga1').value) || 0;

  // Calculate the total price
  const total = volume * price;

  // Display the total price
  document.getElementById('jumlah1').textContent = formatRupiah(total);

  // Update the subtotal (assuming there's only one row for simplicity)
  document.getElementById('total-tenaga-kerja').textContent = formatRupiah(total);
}