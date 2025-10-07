const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

global.pastes = global.pastes || {};

// Halaman utama buat paste
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>PasteLink Clone</title>
        <style>
          body { font-family: sans-serif; margin: 40px; background: #f8f8f8; }
          form { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 5px #aaa; }
          textarea { width: 100%; height: 120px; margin-bottom: 10px; font-size: 14px; padding: 8px; }
          button { background: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; }
          button:hover { background: #0056b3; }
        </style>
      </head>
      <body>
        <h2>Buat Paste Baru</h2>
        <form method="POST" action="/create">
          <textarea name="content" placeholder="Tulis sesuatu di sini..."></textarea><br>
          <button type="submit">Buat Paste</button>
        </form>
      </body>
    </html>
  `);
});

// Proses buat paste baru
app.post("/create", (req, res) => {
  const content = req.body.content || "";
  const id = Date.now().toString();
  global.pastes[id] = content;
  res.redirect(`/p/${id}`);
});

// Halaman lihat paste
app.get("/p/:id", (req, res) => {
  const id = req.params.id;
  const content = global.pastes[id] || "Paste tidak ditemukan.";
  res.send(`
    <html>
      <head>
        <title>Paste ${id}</title>
        <style>
          body { font-family: sans-serif; margin: 40px; background: #f8f8f8; }
          pre { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 5px #aaa; white-space: pre-wrap; }
          a { display: inline-block; margin-top: 20px; color: #007bff; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h2>Paste #${id}</h2>
        <pre>${content}</pre>
        <a href="/">← Kembali</a>
      </body>
    </html>
  `);
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

