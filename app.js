const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');
const helpers = require('./healpers');
const errorHandler = require('./handlers/errorHandler');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

//Configuracoes
//middleware

/*
PROCESSO DE LOGIN

- Requisicao 
-- Validar os campos da requisicao
-- Autorizar o usuario
-- Item de Resposta (Controller)


- Resposta
-- Positiva
-- Negativa


*/

const app = express();

//Essa configuracao precisa vir antes das Rotas


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
}));
app.use(flash());

app.use((req, res, next)=>{
    res.locals.h = helpers;
    res.locals.flashes = req.flash();   
    next();
});


app.use('/', router);
//Middleware para identificar se a rota selecionada existe
app.use(errorHandler.notFound);

// Esse middleware por si só ja funcionaria para redirecionar para uma pagina padrão
// caso a rota nao seja encontrada
// app.use((req, res, next) => {
//     res.send('Pagina nao encontrada');
// });

app.engine('mst', mustache(__dirname+'/views/partials','.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;


