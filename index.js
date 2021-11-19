// Instalar o MongoDB
// Importar o MongoDB
// Realizar a conexão com o banco de dados
// Procurar pela collection que criamos
// Realizar as operações

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb+srv://admin:WXX9UPZCvJiFIV4g@cluster0.yewek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "ocean_nuvem_19_11_2021";

async function main() {

/*  
Desativar a DB do localhost para rodar no heroku

    const client = await MongoClient.connect(url);

    const db = client.db(dbName);

    const collection = db.collection("herois");
*/

// Reativar a DB agora conectado no mongo atlas
    const client = await MongoClient.connect(url);

    const db = client.db(dbName);

    const collection = db.collection("herois");


    // criada const collection = undefined
    /*
    const collection = undefined
    // depois de conectar com o mongo, excluir a const collection
    */

    const app = express();

    // Informando para o Express considerar o corpo da requisição
    // em formato JSON
    app.use(express.json());

    app.get("/", function (req, res) {
        res.send("Olá, Mundo!");
    });

    app.get("/oi", function (req, res) {
        res.send("Olá, mundo!");
    });

    const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
    //               0                   1                2

    // [GET] "/herois" - Read All (Ler tudo)
    app.get("/herois", async function (req, res) {
        const documentos = await collection.find().toArray();

        res.send(documentos);
    });

    // [GET] "/herois/:id" - Read Single By Id (Ler individualmente - pelo Id)
    app.get("/herois/:id", async function (req, res) {
        // Lógica de obtenção do ID
        const id = req.params.id;

        // console.log(id, typeof id);

        // Lógica de acesso ao dados
        const item = await collection.findOne({ _id: new ObjectId(id) });

        // Lógica de envio desse dado encontrado
        res.send(item);
    });

    // [POST] "/herois" - Create
    app.post("/herois", async function (req, res) {
        const item = req.body;

        await collection.insertOne(item);

        res.send(item);
    });

    // [PUT] "/herois/:id" - Update (Atualizar)
    app.put("/herois/:id", async function (req, res) {
        const id = req.params.id;

        const item = req.body;

        await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: item,
            }
        );

        res.send(item);
    });

    // [DELETE] "/herois/:id" - Delete (Remover)
    app.delete("/herois/:id", async function (req, res) {
        const id = req.params.id;

        await collection.deleteOne({ _id: new ObjectId(id) });

        res.send("Registro removido com sucesso.");
    });

    app.listen(process.env.PORT || 3000);
    // process.env.PORT busca a porta no heroku || "ou" porta 3000
}

main();
