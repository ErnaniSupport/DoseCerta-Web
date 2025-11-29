const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// exemplo de regra simples (opcional)
server.post("/transferencias", (req, res, next) => {
    const body = req.body;
    if (!body.vacina_id || !body.estabelecimento_origem || !body.estabelecimento_destino) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }
    next();
});

server.use(router);

server.listen(3001, () => {
    console.log("JSON Server rodando em http://localhost:3001");
});