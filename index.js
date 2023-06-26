var express = require("express");
var cors = require('cors')
var app = express();
var exec=require('child_process').exec;
var port = 7000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post("/privada", function(req, res) {
    
    //recibimos parametros de sesion    
    let id = req.body.id.trim()
    let keySize = req.body.keyS
    let password= req.body.pass.trim()
    let shaS = req.body.shaS
    let AesS = req.body.AesS
    let c = req.body.c.trim()
    let st = req.body.st.trim()
    let l = req.body.l.trim()
    let o = req.body.o.trim()
    let ou = req.body.ou.trim()
    let cn = req.body.cn.trim()
    let dias = req.body.dias
    //console.log(idClean)
    
    //creamos llave privada   
        //let comando = `openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:${keySize} -out ${idClean}.key`
        let comando = `openssl req -x509 -aes-${AesS}-cbc -passout pass:${password} -newkey rsa:${keySize} -keyout key${id}.pem -out cert${id}.pem -sha${shaS} -days ${dias} -nodes -subj "/C=${c}/ST=${st}/L=${l}/O=${o}/OU=${ou}/CN=${cn}" 2>/dev/null && cat key${id}.pem`
        //console.log(comando)
        script = exec(comando);
        // what to do for data coming from the standard out
        script.stdout.on('data', function(data){     
            console.log(data.toString());
            //Enviamos el archivo
            res.setHeader("Content-disposition", `attachment; filename=certificado.key`);
            res.setHeader("Content-type", "text/plain");
            res.charset = "UTF-8";
            res.write(data.toString());
            res.end();
        });

        // what to do with data coming from the standard error
        script.stderr.on('data', function(data){
            console.log(data.toString());
        });
        // what to do when the command is done
        script.on('exit', function(code){
            console.log('program ended with code: ' + code);
        });
        
    });
    
app.post("/publica", function(req, res) {
        //recibimos parametros de sesion    
        let id = req.body.id.trim()
        let keySize = req.body.keyS
        let password= req.body.pass.trim()
        let shaS = req.body.shaS
        let AesS = req.body.AesS
        let c = req.body.c.trim()
        let st = req.body.st.trim()
        let l = req.body.l.trim()
        let o = req.body.o.trim()
        let ou = req.body.ou.trim()
        let cn = req.body.cn.trim()
        let dias = req.body.dias

        //console.log(idClean)
        
        //descargamos la llave publica
            //let comando = `openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:${keySize} -out ${idClean}.key`
            let comando = `cat cert${id}.pem`
            //console.log(comando)
            script = exec(comando);
            // what to do for data coming from the standard out
            script.stdout.on('data', function(data){     
                console.log(data.toString());
                //Enviamos el archivo
                res.setHeader("Content-disposition", `attachment; filename=certificado.cert`);
                res.setHeader("Content-type", "text/plain");
                res.charset = "UTF-8";
                res.write(data.toString());
                res.end();
            });
    
            // what to do with data coming from the standard error
            script.stderr.on('data', function(data){
                console.log(data.toString());
            });
            // what to do when the command is done
            script.on('exit', function(code){
                console.log('program ended with code: ' + code);
            });
            
        });

app.post("/test", function(req, res) {
    
            //recibimos parametros de sesion    
            let id = req.body.id.trim()
    let keySize = req.body.keyS
    let password= req.body.pass.trim()
    let shaS = req.body.shaS
    let AesS = req.body.AesS
    let c = req.body.c.trim()
    let st = req.body.st.trim()
    let l = req.body.l.trim()
    let o = req.body.o.trim()
    let ou = req.body.ou.trim()
    let cn = req.body.cn.trim()
    let dias = req.body.dias
            
            
    console.log(id)
    console.log(keySize)
    console.log(password)
    console.log(shaS)
    console.log(AesS)
    console.log(c)
    console.log(st)
    console.log(l)
    console.log(o)
    console.log(ou)
    console.log(cn)
    console.log(dias)

            });

app.listen(port, function() {
  console.log("puerto : "+port);
  
});

