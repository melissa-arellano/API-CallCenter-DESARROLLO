// var AbandonedCallsImplementation = require('../implementation/AbandonedCallsImplementation');
// var err = AbandonedCallsImplementation.put(service,day,country,from,to,threshold);


exports.put = function (service, day, country, from, to, threshold) {
    return new Promise((resolve, reject) => {

        console.log('\n Entrando a la implementacion de Calls By Duration \n');

        var servicio = service;
        if (service == 'GSS-USA') {
            servicio = 'USA';
        }
        var fecha = day;
        console.log('Fecha --> ' + fecha);

        var pais = country;
        console.log('Pais --> ' + pais);

        var horaInicio = from;
        console.log('Hora inicio --> ' + horaInicio);

        var horaFinal = to;
        console.log('Hora Final --> ' + horaFinal);

        var limite = threshold;
        console.log('Limite --> ' + limite);

        var mysql = require('mysql'); // Incluimos el modulo de MySQL
        // Conexion a la BD
        var promesaConnect = new Promise((resolve, reject) => {
            var connectionBD = mysql.createConnection({
                host: 'localhost', //35.188.135.65
                user: 'root', //root
                password: '',
                database: 'cdr', //cdr
                port: 3306
            });

            connectionBD.connect(function (error) {
                if (error) {
                    //console.log("\n --> Error al conectar a la base de datos")
                    reject();
                } else {
                    //console.log('\n Conexion correcta a la base de datos');
                    resolve(connectionBD);
                }
            });
        })

        //  VALIDACIONES //

        // SI no recibe hora inicio y final 
        if (servicio != null && fecha != null && pais == null && horaInicio == null && horaFinal == null && limite == null) {
            console.log('\nConsulta solo para SERVICIO Y FECHA');

            if (service == 'GSS-USA') {
                country = 'Mexico';
            }

            var promesaQuery = (connectionBDParam) => {
                return new Promise(function (resolve, reject) {
                    var queryString = 'SELECT COUNT(*) AS Total FROM cdr WHERE calldate LIKE "' + [fecha] + '%" AND lastapp="Queue" AND dstchannel!="" AND accountcode LIKE "%' + servicio + '%"';
                    //console.log(queryString);
                    connectionBDParam.query(queryString, [fecha], function (err, rows, fields) {
                        if (err) throw err;
                        var Total = rows[0].Total;
                        console.log('Total llamadas contestadas: ' + Total);

                        item = [];
                        for (var i in rows) {
                            //id = rows[i].id;
                            service = service;
                            day = fecha;
                            country = country;
                            callsAbandoned = Total;
                            from = null;
                            to = null;
                            threshold = limite;
                            informacion = new datosObtenidos(service, day, country, callsAbandoned, from, to, threshold);
                            item.push(informacion);
                        }
                        if (item != []) {
                            resolve(item)
                        } else {
                            reject()
                        }
                    })
                })
            }
        }

        if (servicio != null && fecha != null && pais != null && horaInicio == null && horaFinal == null && limite == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA Y PAIS");
        }

        if (servicio != null && fecha != null && limite != null && pais == null && horaInicio == null && horaFinal == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA Y LIMITE\n");

            if (service == 'GSS-USA') {
                country = 'Mexico';
            }

            limiteNuevo = limite - 1;
            console.log('Nuevo limite');

            var promesaQuery = (connectionBDParam) => {
                return new Promise(function (resolve, reject) {
                    var queryString = 'SELECT COUNT(*) AS Total FROM cdr WHERE calldate LIKE "' + [fecha] + '%" AND lastapp="Queue" AND dstchannel!="" AND accountcode LIKE "%' + servicio + '%" AND billsec <=' + limiteNuevo;
                    console.log(queryString);
                    connectionBDParam.query(queryString, [fecha], function (err, rows, fields) {
                        if (err) throw err;
                        var Total = rows[0].Total;
                        console.log('Total llamadas contestadas: ' + Total);

                        item = [];
                        for (var i in rows) {
                            //id = rows[i].id;
                            service = service;
                            day = fecha;
                            country = country;
                            callsAbandoned = Total;
                            from = null;
                            to = null;
                            threshold = limite;
                            informacion = new datosObtenidos(service, day, country, callsAbandoned, from, to, threshold);
                            item.push(informacion);
                        }
                        if (item != []) {
                            resolve(item)
                        } else {
                            reject()
                        }
                    })
                })
            }
        }

        if (servicio != null && fecha != null && limite != null && pais != null && horaInicio == null && horaFinal == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA, PAIS Y LIMITE");
        }


        // Si recibe hora inicio y final

        if (servicio != null && fecha != null && pais != null && horaInicio != null && horaFinal != null && limite == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA, PAIS, HORA INICIO Y FINAL \n");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio != null && horaFinal != null && limite != null) {
            console.log("\nConsulta solo para SERVICIO, FECHA, LIMITE, HORA INICIO Y FINAL \n");

            if (servicio == 'USA') {
                country = 'Mexico';
            }
            var promesaQuery = (connectionBDParam) => {
                return new Promise(function (resolve, reject) {
                    var queryString = 'SELECT COUNT(*) AS Total FROM cdr WHERE calldate LIKE "' + [fecha] + '%" AND lastapp="Queue" AND dstchannel!="" AND accountcode LIKE "%' + servicio + '%" AND calldate BETWEEN " ' + [fecha] + ' ' + [horaInicio] + '" AND "' + [fecha] + ' ' + [horaFinal] + '" AND billsec <= ' + limite;
                    // console.log(queryString);
                    connectionBDParam.query(queryString, [fecha], function (err, rows, fields) {
                        if (err) throw err;
                        var Total = rows[0].Total;
                        console.log('Total llamadas contestadas: ' + Total);

                        item = [];
                        for (var i in rows) {
                            //id = rows[i].id;
                            service = service;
                            day = fecha;
                            country = country;
                            callsAnswered = Total;
                            from = horaInicio;
                            to = horaFinal;
                            threshold = limite;
                            informacion = new datosObtenidos(service, day, country, callsAnswered, from, to, threshold);
                            item.push(informacion);
                        }
                        if (item != []) {
                            resolve(item)
                        } else {
                            reject()
                        }
                    })
                })
            }
        }

        if (servicio != null && fecha != null && pais == null && horaInicio != null && horaFinal != null && limite == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA, HORA INICIO Y FINAL \n");

            if (servicio == 'USA') {
                country = 'Mexico';
            }

            var promesaQuery = (connectionBDParam) => {
                return new Promise(function (resolve, reject) {
                    var queryString = 'SELECT COUNT(*) AS Total FROM cdr WHERE calldate LIKE "' + [fecha] + '%" AND lastapp="Queue" AND dstchannel!="" AND accountcode LIKE "%' + servicio + '%" AND calldate BETWEEN " ' + [fecha] + ' ' + [horaInicio] + '" AND "' + [fecha] + ' ' + [horaFinal] + '"';
                    //console.log(queryString);
                    connectionBDParam.query(queryString, [fecha], function (err, rows, fields) {
                        if (err) throw err;
                        var Total = rows[0].Total;
                        console.log('Total llamadas contestadas: ' + Total);

                        item = [];
                        for (var i in rows) {
                            //id = rows[i].id;
                            service = service;
                            day = fecha;
                            country = country;
                            callsAnswered = Total;
                            from = horaInicio;
                            to = horaFinal;
                            threshold = null;
                            informacion = new datosObtenidos(service, day, country, callsAnswered, from, to, threshold);
                            item.push(informacion);
                        }
                        if (item != []) {
                            resolve(item)
                        } else {
                            reject()
                        }
                    })
                })
            }
        }


        // Si recibe solo la hora inicial 

        if (servicio != null && fecha != null && pais != null && horaInicio != null && horaFinal == null && limite == null) {
            console.log("\n --> ERROR: Es necesario una hora final (viene pais)");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio != null && horaFinal == null && limite != null) {
            console.log("\n --> ERROR: Es necesario una hora final (viene limite)");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio != null && horaFinal == null && limite == null) {
            console.log("--> ERROR: Es necesario una hora final (falta pais y limite)");
        }

        if (servicio != null && fecha != null && pais != null && horaInicio != null && horaFinal == null && limite != null) {
            console.log("\n --> ERROR: Es necesario una hora final (viene pais y limite)");
        }


        // Si recibe solo la hora final

        if (servicio != null && fecha != null && pais != null && horaInicio == null && horaFinal != null && limite == null) {
            console.log("\n --> ERROR: Es necesario una hora final inicial (viene pais)");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio == null && horaFinal != null && limite != null) {
            console.log("\n --> ERROR: Es necesario una hora inicial (viene limite)");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio == null && horaFinal != null && limite == null) {
            console.log("--> ERROR: Es necesario una hora inicial (falta pais y limite)");
        }

        if (servicio != null && fecha != null && pais != null && horaInicio == null && horaFinal != null && limite != null) {
            console.log("\n --> ERROR: Es necesario una hora inicial (viene pais y limite)");
        }

        function datosObtenidos(service, day, country, callsAnswered, from, to, threshold) {
            this.service = service;
            this.day = day;
            this.country = country;
            this.callsAnswered = callsAnswered;
            this.from = from;
            this.to = to;
            this.threshold = threshold;
        }

        promesaConnect.then((res) => {
                return promesaQuery(res);
            }).catch(err => {
                reject('\n --> DATOS INCORRECTOS');
            })
            .then((result) => {
                resolve(JSON.stringify(result));
            })
            .catch(error => {
                reject('\n --> UNA DE LAS PROMESAS FALLO');
            });
    });
    connectionBD.end();
}