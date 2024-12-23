document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi Peta
    const map = L.map('map').setView([-7.54, 112.24], 8);

    // Tambahkan Layer Peta Topografi dari OpenTopoMap
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)',
        maxZoom: 8
    }).addTo(map);

    // Fungsi untuk Membuat Marker Khusus
    function createCustomMarker(color) {
        return L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                    <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 12px solid ${color}; position: absolute; bottom: -4px;"></div>
                    <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%;"></div>
                </div>`,
            iconSize: [12, 20],
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi Peta
    const map = L.map('map').setView([-7.54, 112.24], 8);

    // Tambahkan Layer Peta Topografi dari OpenTopoMap
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)',
        maxZoom: 8
    }).addTo(map);

    // Fungsi untuk Membuat Marker Khusus
    function createCustomMarker(color) {
        return L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                    <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 12px solid ${color}; position: absolute; bottom: -4px;"></div>
                    <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%;"></div>
                </div>`,
            iconSize: [12, 20],
        });
    }

    // Tambahkan Filter Tahun
    const filterContainer = L.control({ position: 'topleft' });
    filterContainer.onAdd = function () {
        const div = L.DomUtil.create('div', 'filter-container');
        div.innerHTML = `
            <label for="yearFilter">Filter Tahun:</label>
            <select id="yearFilter">
                <option value="all">Semua Tahun</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </select>`;
        return div;
    };
    filterContainer.addTo(map);

    const yearFilter = document.getElementById('yearFilter');
    let markers = [];

    // Fungsi untuk Menampilkan Gunung Berdasarkan Filter Tahun
    function filterVolcanoesByYear(volcanoData, year) {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        volcanoData.forEach(volcano => {
            const historyYears = volcano.history ? volcano.history.split(',').map(event => event.trim().split(':')[0]) : [];
            if (year === 'all' || historyYears.includes(year)) {
                const color = volcano.status.toLowerCase() === 'aktif' ? 'red' : 'blue';

                const marker = L.marker([volcano.lat, volcano.lng], {
                    icon: createCustomMarker(color),
                })
                    .addTo(map)
                    .bindPopup(
                        `<h3>${volcano.name}</h3>
                         <p>Status: ${volcano.status}</p>
                         <p>Riwayat Aktivitas:</p>
                         <ul>
                            ${volcano.history
                                ? volcano.history.split(',').map(event => `<li>${event}</li>`).join('')
                                : '<li>Tidak ada riwayat</li>'}
                         </ul>`
                    );
                markers.push(marker);
            }
        });
    }

    // Ambil Data Gunung dari API
    fetch('http://localhost/spasial/api.php?action=volcanoes')
        .then(response => response.json())
        .then(volcanoData => {
            filterVolcanoesByYear(volcanoData, 'all');

            // Tambahkan Event Listener pada Filter Tahun
            yearFilter.addEventListener('change', () => {
                const selectedYear = yearFilter.value;
                filterVolcanoesByYear(volcanoData, selectedYear);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});


    // Tambahkan Legenda
    const legend = L.control({ position: 'topright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = `
            <h3>PETA GUNUNG AKTIF</h3>
            <div class="north-arrow"></div>
            <h3>_________________</h3>
            <h3>Legenda</h3>
            <ul>
            <li><span class="marker red"></span> Gunung Aktif</li>
            <li><span class="marker blue"></span> Gunung Tidak Aktif</li>
            <li><span class="kotak elevasi-1"></span> 0-200 mdpl (Laut)</li>
            <li><span class="kotak elevasi-2"></span> 200-500 mdpl (Lembah)</li>
            <li><span class="kotak elevasi-3"></span> 500-1.000 mdpl (Dataran Tinggi)</li>
            <li><span class="kotak elevasi-4"></span> 1.000-1.500 mdpl (Bukit)</li>
            <li><span class="kotak elevasi-5"></span> 1.500-2.000 mdpl (Gunung Rendah)</li>
            <li><span class="kotak elevasi-6"></span> 2.000-3.000 mdpl (Gunung Tinggi)</li>
            <li><span class="kotak elevasi-7"></span> > 3.000 mdpl (Puncak)</li>
            </ul>
            <h3>_________________</h3>
            <div class="team">
            <p><strong>Tim Pengembang:</strong></p>
            <ul>
            <li><strong>Firzannabeel Aqila Rafid</strong></li>
            <li><strong><em>(22081010285)</em></strong></li>
            <li><strong>Bagas Alif Virgano</strong></li>
            <li><strong><em>(22081010312)</em></strong></li>
            <li><strong>Darell Harin Pramudita W.</strong></li>
            <li><strong><em>(22081010338)</em></strong></li>
            
            </ul>
        </div>
        `;
        return div;
    };
    legend.addTo(map);

    // Ambil Data Gunung dari API
    fetch('http://localhost/spasial/api.php?action=volcanoes')
        .then(response => response.json())
        .then(volcanoData => {
            volcanoData.forEach(volcano => {
                const color = volcano.status.toLowerCase() === 'aktif' ? 'red' : 'blue';

                L.marker([volcano.lat, volcano.lng], {
                    icon: createCustomMarker(color),
                })
                    .addTo(map)
                    .bindPopup(
                        `<h3>${volcano.name}</h3>
                         <p>Status: ${volcano.status}</p>
                         <p>Riwayat Aktivitas:</p>
                         <ul>
                            ${volcano.history
                                ? volcano.history.split(',').map(event => `<li>${event}</li>`).join('')
                                : '<li>Tidak ada riwayat</li>'}
                         </ul>`
                    );
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
