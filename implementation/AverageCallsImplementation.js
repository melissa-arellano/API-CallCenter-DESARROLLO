// var AbandonedCallsImplementation = require('../implementation/AbandonedCallsImplementation');
// var err = AbandonedCallsImplementation.put(service,day,country,from,to,threshold);


exports.put = function (service, day, country, from, to, threshold) {
    return new Promise((resolve, reject) => {

        console.log('\n Entrando a la implementacion de Average Calls Implementation');

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
                    console.log("\n --> Error al conectar a la base de datos")
                    reject();
                } else {
                    console.log('\n Conexion correcta a la base de datos');
                    resolve(connectionBD);
                }
            });
        })

        // VALIDACIONES

        // SI no recibe hora inicio y final 
        if (servicio != null && fecha != null && pais == null && horaInicio == null && horaFinal == null && limite == null) {
            console.log('\nConsulta solo para SERVICIO Y FECHA');

            if (service == 'GSS-USA') {
                country = 'Mexico';
            }

            var promesaQuery = (connectionBDParam) => {
                return new Promise(function (resolve, reject) {
                    var queryString = 'SELECT ((SUM(SUBSTR(Tiempo, 1,2)))*60*60) as HorasSegundos, SUM(SUBSTR(Tiempo, 4,2)*60) as MinutosSegundos, SUM(SUBSTR(Tiempo, 7,2)) as Segundos, COUNT(*) as CantidadLlamadas FROM tiemposesperallamadas WHERE Entrada LIKE "' + [fecha] + '%"';
                    //console.log(queryString);
                    connectionBDParam.query(queryString, [fecha], function (err, rows, fields) {
                    console.log(queryString);
                        if (err) throw err;

                        var horasSegundos = rows[0].HorasSegundos;
                        var minutosSegundos = rows[0].MinutosSegundos;
                        var segundos = rows[0].Segundos; 
                        var cantidadLlamadas = rows[0].CantidadLlamadas;

                        console.log('Horas Segundos: ' + horasSegundos);
                        console.log('Minutos Segundos: '+ minutosSegundos);
                        console.log('Segundos: ' + segundos);
                        console.log('Cantidad de Llamadas: ' + cantidadLlamadas);

                        var promedio = (horasSegundos + minutosSegundos + segundos)/cantidadLlamadas;
                        console.log(promedio);
                        var porcionPromedio = promedio.substring(1,2);
                        console.log(porcionPromedio);

                        item = [];
                        for (var i in rows) {
                            //id = rows[i].id;
                            service = service;
                            day = fecha;
                            country = country;
                            AverageWaitingTimeOfCallsAnswered = horasSegundos;
                            from = null;
                            to = null;
                            threshold = limite;
                            informacion = new datosObtenidos(service, day, country, AverageWaitingTimeOfCallsAnswered, from, to, threshold);
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

        function datosObtenidos(service, day, country, AverageWaitingTimeOfCallsAnswered, from, to, threshold) {
            this.service = service;
            this.day = day;
            this.country = country;
            this.AverageWaitingTimeOfCallsAnswered = AverageWaitingTimeOfCallsAnswered;
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