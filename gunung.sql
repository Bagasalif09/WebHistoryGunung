CREATE TABLE volcanoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255),
    lat FLOAT,
    lng FLOAT,
    STATUS VARCHAR(50)
);

CREATE TABLE volcano_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    volcano_id INT,
    eruption_year VARCHAR(50),
    FOREIGN KEY (volcano_id) REFERENCES volcanoes(id)
);

INSERT INTO volcanoes (NAME, lat, lng, STATUS)
VALUES 
('Gunung Semeru', -8.108, 112.922, 'Aktif'),
('Gunung Bromo', -7.942, 112.953, 'Aktif'),
('Gunung Kelud', -7.93, 112.31, 'Aktif'),
('Gunung Merapi', -7.5394, 110.4461, 'Aktif'),
('Gunung Slamet', -7.2422, 109.2081, 'Aktif'),
('Gunung Ciremai', -6.8907, 108.407, 'Aktif'),
('Gunung Papandayan', -7.3167, 107.73, 'Aktif'),
('Gunung Gede', -6.7771, 107.0084, 'Aktif'),
('Gunung Tangkuban Parahu', -6.7608, 107.609, 'Aktif'),
('Gunung Dieng', -7.2047, 109.9104, 'Aktif'),
('Gunung Lawu', -7.6272, 111.1996, 'Tidak Aktif'),
('Gunung Muria', -6.649, 110.853, 'Tidak Aktif'),
('Gunung Kawi', -7.9236, 112.445, 'Tidak Aktif'),
('Gunung Wilis', -7.8498, 111.802, 'Tidak Aktif'),
('Gunung Panderman', -7.894, 112.5215, 'Tidak Aktif'),
('Gunung Argopuro', -7.9412, 113.5045, 'Tidak Aktif'),
('Gunung Ijen', -8.0581, 114.242, 'Tidak Aktif'),
('Gunung Patuha', -7.1648, 107.4021, 'Tidak Aktif'),
('Gunung Kendeng', -7.6386, 111.1607, 'Tidak Aktif');


INSERT INTO volcano_history (volcano_id, eruption_year)
VALUES 
(1, 'Erupsi 2021'), (1, 'Erupsi 2022'), (1, 'Erupsi 2023'),
(2, 'Erupsi 2019'), (2, 'Erupsi 2020'), (2, 'Erupsi 2021'),
(3, 'Erupsi 2014'), (3, 'Erupsi 2019'),
(4, 'Erupsi 2014'), (4, 'Erupsi 2019'),
(5, 'Erupsi 2009'), (5, 'Erupsi 2014'), (5, 'Erupsi 2020'), -- Gunung Slamet
(6, 'Erupsi 1951'), (6, 'Erupsi 1983'), (6, 'Erupsi 2019'), -- Gunung Ciremai
(7, 'Erupsi 2002'), (7, 'Erupsi 2008'), (7, 'Erupsi 2022'), -- Gunung Papandayan
(8, 'Erupsi 1747'), (8, 'Erupsi 1947'), (8, 'Erupsi 2021'), -- Gunung Gede
(9, 'Erupsi 1821'), (9, 'Erupsi 1952'), (9, 'Erupsi 2019'), -- Gunung Tangkuban Parahu
(10, 'Erupsi 1826'), (10, 'Erupsi 1979'); -- Gunung Dieng

SELECT v.id, v.name, v.lat, v.lng, v.status, 
       GROUP_CONCAT(h.eruption_year ORDER BY h.eruption_year DESC) AS history
FROM volcanoes v
LEFT JOIN volcano_history h ON v.id = h.volcano_id
GROUP BY v.id

