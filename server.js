const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = 3000;

app.use(express.json());

const dbConfig = {
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database:"naprendszer"
};

const pool = mysql.createPool(dbConfig);

app.get("/bolygok", async (req, res) => {
    try {
        const [adatok] = await pool.query(
            "SELECT * FROM bolygok"
        );

        res.status(200).json(adatok);
    }
    catch (hiba) {
        res.status(500).send("Adatbazis hiba: " + hiba.message);
    }
 
});
  
app.delete("/torles", async (req, res) => {
    try {
        const id = req.query.bolygo_id;

        const [eredmeny] = await pool.query(
            "DELETE FROM bolygok WHERE bolygo_id = ?",
            [id]
        );

        if (eredmeny.affectedRows === 0) {
            return res.status(404).send();
        }

        res.status(200).send();
    }
    catch (hiba) {
        console.log(hiba);
        res.status(500).send(hiba.message);
    }
});
app.listen(port, () => {
    console.log("Szerver fut a " + port + " porton!");
}); ;