// Mengambil elemen canvas dari HTML dan mendapatkan konteks 2D
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
// Mengatur lebar dan tinggi canvas sesuai dengan ukuran jendela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mendeklarasikan array untuk menyimpan objek kembang api
let fireworks = [];
// Memuat suara peluncuran dan ledakan
let launchSound = new Audio("kapi.mp3");
let explosionSound = new Audio("kapi.mp3");

// Kelas untuk objek kembang api
class Firework {
  constructor(x, y) {
    this.x = x; // Posisi X kembang api
    this.y = y; // Posisi Y kembang api
    this.size = Math.random() * 3 + 2; // Ukuran kembang api
    this.speed = Math.random() * 2 + 2; // Kecepatan kembang api
    this.angle = Math.random() * Math.PI * 2; // Sudut peluncuran
    this.exploded = false; // Status apakah kembang api sudah meledak
    this.particles = []; // Array untuk menyimpan partikel setelah meledak
    this.maxHeight = Math.random() * (canvas.height / 2); // Ketinggian acak untuk meledak
    launchSound.currentTime = 0; // Mengatur ulang suara peluncuran
    launchSound.play(); // Memutar suara peluncuran
  }

  // Memperbarui posisi kembang api
  update() {
    if (!this.exploded) {
      this.y -= this.speed; // Menggerakkan kembang api ke atas

      // Jika kembang api mencapai ketinggian acak (maxHeight), meledak
      if (this.y <= this.maxHeight) {
        this.explode();
      }
    } else {
      // Jika sudah meledak, perbarui partikel
      this.particles.forEach((particle) => particle.update());
      // Hapus partikel yang telah habis masa hidupnya
      this.particles = this.particles.filter((particle) => particle.life > 0);
    }
  }

  // Fungsi untuk meledakkan kembang api
  explode() {
    explosionSound.currentTime = 0; // Mengatur ulang suara ledakan
    explosionSound.play(); // Memutar suara ledakan
    this.exploded = true; // Menandai kembang api sebagai meledak
    // Membuat 100 partikel dari posisi kembang api
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }

  // Menggambar kembang api atau partikel
  draw() {
    if (!this.exploded) {
      ctx.fillStyle = "red"; // Mengatur warna kembang api menjadi merah
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Menggambar lingkaran
      ctx.fill(); // Mengisi lingkaran
    } else {
      // Jika sudah meledak, gambar partikel
      this.particles.forEach((particle) => particle.draw());
    }
  }
}

// Kelas untuk partikel yang dihasilkan dari ledakan kembang api
class Particle {
  constructor(x, y) {
    this.x = x; // Posisi X partikel
    this.y = y; // Posisi Y partikel
    this.size = Math.random() * 3 + 1; // Ukuran partikel
    this.speed = Math.random() * 3 + 1; // Kecepatan partikel
    this.angle = Math.random() * Math.PI * 2; // Sudut gerakan partikel
    this.life = 100; // Umur partikel
  }

  // Memperbarui posisi partikel
  update() {
    this.x += Math.cos(this.angle) * this.speed; // Menggerakkan partikel berdasarkan sudut
    this.y += Math.sin(this.angle) * this.speed; // Menggerakkan partikel berdasarkan sudut
    this.life--; // Mengurangi umur partikel
  }

  // Menggambar partikel
  draw() {
    ctx.fillStyle = "rgba(255, 0, 0, " + this.life / 100 + ")"; // Mengatur warna partikel menjadi merah dengan transparansi
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Menggambar lingkaran untuk partikel
    ctx.fill(); // Mengisi lingkaran
  }
}

// Fungsi untuk menjalankan animasi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus canvas
  // Menambahkan kembang api baru secara acak
  if (Math.random() < 0.05) {
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height)); // Menambahkan kembang api baru di posisi acak
  }

  // Memperbarui dan menggambar setiap kembang api
  fireworks.forEach((firework, index) => {
    firework.update(); // Memperbarui posisi kembang api
    firework.draw(); // Menggambar kembang api
    // Menghapus kembang api dari array jika sudah meledak dan tidak ada partikel yang tersisa
    if (firework.exploded && firework.particles.length === 0) {
      fireworks.splice(index, 1); // Menghapus kembang api dari array
    }
  });

  // Memanggil fungsi animate secara berulang untuk menciptakan efek animasi
  requestAnimationFrame(animate);
}

// Menambahkan event listener untuk menangani klik pada canvas
canvas.addEventListener("click", (event) => {
  // Menambahkan kembang api baru di posisi klik
  fireworks.push(new Firework(event.clientX, event.clientY));
});

// Menunggu hingga seluruh konten DOM dimuat sebelum menjalankan skrip
document.addEventListener("DOMContentLoaded", () => {
  // Mengambil elemen-elemen yang diperlukan dari DOM
  const nameInputContainer = document.getElementById("nameInputContainer");
  const nameInput = document.getElementById("nameInput");
  const okButton = document.getElementById("okButton");
  const greetingMessage = document.getElementById("greetingMessage");
  const greetingMessageBox = document.getElementById("greetingMessageBox");
  const greetingButtonContainer = document.getElementById(
    "greetingButtonContainer"
  );
  const profilePic = document.querySelector(".profile-pic");
  const profileImage = profilePic.querySelector("img");
  const messageBox = document.getElementById("messageBox");
  const swipeButton = document.getElementById("swipeButton");
  const buttonContainer = document.getElementById("buttonContainer");
  const birthdayContainer = document.getElementById("birthdayContainer");
  const birthdaySong = document.getElementById("birthdaySong");

  // Array untuk menyimpan pesan ucapan selamat ulang tahun
  const messages = [
    ["Hii, ga kerasa ya..", "Udah mau Lebaran aja :("],
    ["Minal Aidzin Wal Faidzin", "Taqabalallahu minna", "Wa minkum"],
    [
      "Selamat Hari Raya Idul Fitri!",
      "Mohon maaf lahir dan batin",
      "Semoga kita semua diberikan kebahagiaan 🤲",
    ],
    [
      "Seneng banget deh, Lebaran kali ini",
      "Bisa ucapin langsung ke kalian semua 🤍",
    ],
    [
      "Semoga kita bisa berkumpul lagi",
      "Di Lebaran tahun depan",
      "Dan seterusnya ✨",
    ],
    [
      "Oh iya, jangan lupa juga THR",
      "Atau traktiran yaa,",
      "Aku tunggu, hehe 😆",
    ],
    ["Have a happy day! ✨", "Selamat Hari Raya buat kalian semua..🥳"],
  ];

  // Array untuk menyimpan gambar yang ditampilkan bersamaan dengan pesan
  const images = [
    "https://feeldreams.github.io/pusn.gif",
    "https://feeldreams.github.io/bunga.gif",
    "https://feeldreams.github.io/ngumpet.gif",
    "https://feeldreams.github.io/pusn.gif",
    "https://feeldreams.github.io/pusn.gif",
    "https://feeldreams.github.io/pandaketawa2.gif",
    "https://feeldreams.github.io/emawh.gif",
  ];

  let currentIndex = 0; // Indeks untuk melacak pesan dan gambar yang ditampilkan

  // Event listener untuk tombol OK
  okButton.addEventListener("click", () => {
    const userName = nameInput.value.trim(); // Mengambil nama dari input
    if (userName) {
      // Jika nama tidak kosong, tampilkan pesan selamat datang
      greetingMessage.innerHTML = `Selamat datang ${userName}! <br> Ada ucapan selamat hari raya nih <br> buat kamu dari Gunawan. <br> Penasaran? ayo di next! `;
      nameInputContainer.style.display = "none"; // Menyembunyikan input nama
      greetingMessageBox.style.display = "block"; // Menampilkan pesan selamat datang
      greetingButtonContainer.style.display = "block"; // Menampilkan tombol untuk melanjutkan
    } else {
      alert("Silakan masukkan nama Anda.");
    }
  });

  // Event listener untuk tombol "next"
  nextButton.addEventListener("click", () => {
    // Menyembunyikan pesan selamat datang dan tombol
    greetingMessageBox.style.display = "none";
    greetingButtonContainer.style.display = "none";
    profilePic.style.display = "block"; // Menampilkan gambar profil
    messageBox.style.display = "block"; // Menampilkan kotak pesan
    buttonContainer.style.display = "block"; // Menampilkan tombol swipe

    currentIndex = 0; // Mengatur indeks pesan ke 0
    // Menampilkan pesan pertama
    messageBox.innerHTML = messages[currentIndex]
      .map((line) => `<p>${line}</p>`)
      .join("");
    profileImage.src = images[currentIndex]; // Mengatur gambar profil sesuai dengan indeks

    birthdaySong.play();
  });

  // Event listener untuk tombol swipe
  swipeButton.addEventListener("click", () => {
    // Menambahkan efek transisi saat mengganti pesan
    messageBox.style.transform = "translateX(100%)"; // Menggeser kotak pesan keluar
    messageBox.style.opacity = "0"; // Mengurangi opasitas kotak pesan
    profileImage.style.transform = "scale(0)"; // Mengurangi ukuran gambar profil
    profileImage.style.opacity = "0"; // Mengurangi opasitas gambar profil

    // Menunggu beberapa waktu sebelum mengganti pesan
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % messages.length; // Mengupdate indeks pesan

      // Jika sudah mencapai pesan terakhir
      if (currentIndex === messages.length - 1) {
        messageBox.style.display = "none"; // Menyembunyikan kotak pesan
        buttonContainer.style.display = "none"; // Menyembunyikan tombol
        birthdayContainer.style.display = "block"; // Menampilkan kontainer ulang tahun
        // birthdaySong.play(); // Memutar lagu ulang tahun
        animate(); // Memulai animasi kembang api
      } else {
        // Menampilkan pesan dan gambar baru
        messageBox.innerHTML = messages[currentIndex]
          .map((line) => `<p>${line}</p>`)
          .join("");
        profileImage.src = images[currentIndex]; // Mengatur gambar profil sesuai dengan indeks

        // Menambahkan efek transisi saat menampilkan pesan baru
        messageBox.style.transform = "translateX(-100%)"; // Menggeser kotak pesan keluar
        setTimeout(() => {
          messageBox.style.transform = "translateX(0)"; // Menggeser kotak pesan kembali ke posisi semula
          messageBox.style.opacity = "1"; // Mengembalikan opasitas kotak pesan
        }, 50);

        profileImage.style.transform = "scale(1)"; // Mengembalikan ukuran gambar profil
        profileImage.style.opacity = "1"; // Mengembalikan opasitas gambar profil
      }
    }, 500); // Waktu tunggu sebelum mengganti pesan
  });
});

const audio = document.getElementById("birthdaySong");
audio.volume = 0.5; // Mengatur volume ke 50%
