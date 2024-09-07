const https = require('https');
const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
const fs = require('fs');

// Agent untuk mengabaikan sertifikat SSL
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function uploadImage() {
  const form = new FormData();
  form.append('gallery', '');
  form.append('optsize', '0');
  form.append('expire', '0');
  form.append('numfiles', '1');
  form.append('upload_session', '1725712156974.1415732803869605'); // 1725712156974.1415732803869605 || 1725713955302.9601261774318999 || 1725713998569.9215759728336377
  form.append('file', fs.createReadStream('tes2.jpg')); // Ganti dengan path file Anda

  try {
    console.log('Uploading image...');
    const response = await axios.post('https://postimages.org/json/rr', form, {
      headers: {
        ...form.getHeaders(),
        'accept': 'application/json',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9,id;q=0.8,ms;q=0.7',
        'cache-control': 'no-cache',
        'origin': 'https://postimages.org',
        'referer': 'https://postimages.org/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36 Edg/128.0.0.0',
        'x-requested-with': 'XMLHttpRequest',
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      httpsAgent, // Tambahkan agent ini untuk mengabaikan sertifikat SSL
    });

    console.log('Upload successful:', response.data); // Log hasil response dari server

    const previewUrl = response.data.url; // URL halaman hasil upload
    console.log('Preview URL:', previewUrl);

    // Langkah berikutnya adalah mengambil halaman dan mencari URL asli
    const directLink = await getDirectLink(previewUrl);
    console.log('Direct link:', directLink);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

async function getDirectLink(previewUrl) {
  try {
    console.log('Fetching preview page:', previewUrl);
    const { data } = await axios.get(previewUrl, {
      httpsAgent,  // Menggunakan agent untuk mengabaikan SSL
    });
    console.log('Preview page fetched successfully.');

    // Log HTML yang diambil untuk analisis

    const $ = cheerio.load(data);
    
    // Log HTML setelah diparse dengan Cheerio
    console.log('Parsed HTML:', $.html());

    // Ambil nilai atribut href dari elemen a dengan id "download"
    const directLink = $('a#download').attr('href');
    console.log('Direct link from preview page:', directLink);

    return directLink;
  } catch (error) {
    console.error('Error fetching direct link:', error);
    return null;
  }
}

uploadImage();
