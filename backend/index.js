import http from "http";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/api/notes") {
    try {
      const result = await pool.query(
        "SELECT id, text FROM notes ORDER BY id"
      );

      res.writeHead(200);
      res.end(JSON.stringify(result.rows));
    } catch (error) {
      console.error(error);

      res.writeHead(500);
      res.end(
        JSON.stringify({
          error: "Database error",
        })
      );
    }

    return;
  }

  res.writeHead(200);
  res.end(
    JSON.stringify({
      message: "Андрюх ку!!!",
    })
  );
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server started on port 3000");
});
