"use strict";
// // functions that use postgresql pg library to execute db queries etc
Object.defineProperty(exports, "__esModule", { value: true });
class PostgresQueries {
    dbGetData(pool, fnGetString, reply, results) {
        var queryString = fnGetString();
        pool
            .query(queryString)
            .then(result => {
            var firstRowAsString = '';
            if (result !== undefined && result.rows !== undefined) {
                // result.rows.forEach( val => console.log(val));
                firstRowAsString = JSON.stringify(result.rows[0]);
            }
            reply(results.success + firstRowAsString);
        })
            .catch(e => {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            reply(results.failure + message).code(500);
        });
    }
    async dbGetDataInternal(pool, fnGetString, reply, results) {
        var queryString = fnGetString();
        try {
            const result = await pool.query(queryString);
            // .then(result => {
            var firstRowAsString = '';
            if (result !== undefined && result.rows !== undefined) {
                // result.rows.forEach( val => console.log(val));
                firstRowAsString = JSON.stringify(result.rows[0]);
            }
            return firstRowAsString;
            // reply(results.success + firstRowAsString);
        }
        catch (e) {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            // reply(results.failure + message).code(500);
        }
    }
    async dbGetDataListInternal(pool, fnGetString, reply, results) {
        var queryString = fnGetString();
        try {
            const result = await pool.query(queryString);
            const rowsAsJSON = [];
            if (result !== undefined && result.rows !== undefined) {
                // result.rows.forEach(row => rowsAsJSON.push(JSON.stringify(row)));
                result.rows.forEach(row => rowsAsJSON.push(row));
            }
            return rowsAsJSON;
        }
        catch (e) {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            // reply(results.failure + message).code(500);
            return [];
        }
    }
    dbGetUnmatchedDrivers(pool, fnGetString, reply, results) {
        var queryString = fnGetString();
        pool
            .query(queryString)
            .then(result => {
            var firstRowAsString = '';
            var rowsToSend = [];
            if (result !== undefined && result.rows !== undefined) {
                result.rows.forEach(val => {
                    rowsToSend.push(val);
                });
            }
            // console.log('unmatched drivers: ', rowsToSend);
            reply(rowsToSend);
        })
            .catch(e => {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbGetDriversDetails(pool, fnGetString, reply, results) {
        var queryString = fnGetString();
        pool
            .query(queryString)
            .then(result => {
            var firstRowAsString = '';
            var rowsToSend = [];
            if (result !== undefined && result.rows !== undefined) {
                result.rows.forEach(val => {
                    rowsToSend.push(val);
                });
            }
            // console.log('drivers details: ', rowsToSend);
            reply(rowsToSend);
        })
            .catch(e => {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbGetDriverMatchesDetails(pool, fnGetString, reply, results) {
        var queryString = fnGetString();
        pool
            .query(queryString)
            .then(result => {
            var firstRowAsString = '';
            var rowsToSend = [];
            if (result !== undefined && result.rows !== undefined) {
                result.rows.forEach(val => {
                    rowsToSend.push(val);
                });
            }
            // console.log('driver matches details: ', rowsToSend);
            reply(rowsToSend);
        })
            .catch(e => {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbGetUnmatchedRiders(pool, fnGetString, reply, results) {
        var queryString = fnGetString();
        pool
            .query(queryString)
            .then(function (result) {
            var firstRowAsString = '';
            var rowsToSend = [];
            if (result !== undefined && result.rows !== undefined) {
                result.rows.forEach(function (val) {
                    rowsToSend.push(val);
                });
            }
            // console.log('unmatched riders: ', rowsToSend);
            reply(rowsToSend);
        })
            .catch(function (e) {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbGetMatchesData(pool, fnGetString, reply, results) {
        var queryString = fnGetString();
        pool
            .query(queryString)
            .then(result => {
            var firstRowAsString = '';
            if (result !== undefined && result.rows !== undefined) {
                result.rows.forEach(val => {
                    firstRowAsString += JSON.stringify(val);
                });
                // console.log(JSON.stringify(result.rows[0]));
            }
            reply(results.success + firstRowAsString);
        })
            .catch(e => {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbGetMatchSpecificData(pool, fnGetString, uuid, reply, results) {
        var queryString = fnGetString(uuid);
        // console.log('match rider query: ' + queryString);
        pool
            .query(queryString)
            .then(result => {
            var firstRowAsString = '';
            if (result !== undefined && result.rows !== undefined) {
                result.rows.forEach(val => {
                    firstRowAsString += JSON.stringify(val);
                });
                // console.log(JSON.stringify(result.rows[0]));
            }
            reply(results.success + firstRowAsString);
        })
            .catch(e => {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(results.failure, message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbInsertData(payload, pool, fnInsertString, fnPayloadArray, req, reply, results) {
        var insertString = fnInsertString();
        pool
            .query(insertString, fnPayloadArray(req, payload))
            .then(result => {
            var displayResult = result || '';
            var uuid = '';
            try {
                displayResult = JSON.stringify(result);
                uuid = result.rows[0].UUID;
                console.error('row: ' + JSON.stringify(result.rows[0]));
            }
            catch (err) {
                console.error('no uuid returned');
            }
            // console.log('insert: ', uuid + ' ' + displayResult);
            if (payload._redirect) {
                reply.redirect(payload._redirect + '?uuid=' + uuid.toString());
            }
            else {
                reply(results.success + ': ' + uuid);
            }
        })
            .catch(e => {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error('query error: ', message, stack);
            reply(results.failure + ': ' + message).code(500);
        });
    }
    async dbInsertDataInternal(payload, pool, fnInsertString, fnPayloadArray, req, reply, results) {
        var insertString = fnInsertString();
        try {
            const result = await pool.query(insertString, fnPayloadArray(req, payload));
            let displayResult = result || '';
            let uuid = '';
            try {
                displayResult = JSON.stringify(result);
                uuid = result.rows[0].UUID;
                console.error('row: ' + JSON.stringify(result.rows[0]));
            }
            catch (err) {
                console.error('no uuid returned');
            }
            // console.log('insert: ', uuid + ' ' + displayResult);
            if (payload._redirect) {
                // reply.redirect(payload._redirect + '?uuid=' + uuid.toString());
            }
            else {
                return uuid;
                // reply(results.success + ': ' + uuid);
            }
        }
        catch (e) {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error('query error: ', message, stack);
            // reply(results.failure + ': ' + message).code(500);
        }
    }
    dbExecuteCarpoolAPIFunction_Insert(payload, pool, fnExecuteFunctionString, fnPayloadArray, req, reply, results) {
        var queryString = fnExecuteFunctionString();
        // console.log('executeFunctionString Insert: ' + queryString);
        pool
            .query(queryString, fnPayloadArray(req, payload))
            .then(function (result) {
            var firstRow = '';
            var displayResult = result || '';
            var uuid = '';
            var code = '';
            var info = '';
            try {
                displayResult = JSON.stringify(result);
                uuid = result.rows[0].out_uuid;
                code = result.rows[0].out_error_code;
                info = result.rows[0].out_error_text;
                console.error('row: ' + JSON.stringify(result.rows[0]));
            }
            catch (err) {
                console.error('no uuid returned');
            }
            if (result !== undefined && result.rows !== undefined) {
                // result.rows.forEach( val => console.log(val));
                result.rows.forEach(function (val) {
                    return console.log('exec fn: ' + val);
                });
                firstRow = result.rows[0];
            }
            console.error('executed fn: ' + firstRow);
            if (payload._redirect && uuid != undefined) {
                var reply_url = payload._redirect + '&uuid=' + uuid.toString();
                if (code != undefined) {
                    reply_url += '&code=' + code.toString();
                }
                if (info != undefined) {
                    reply_url += '&info=' + info.toString();
                }
                reply.redirect(reply_url);
            }
            else {
                // reply(results.success + ': ' + uuid);
                reply(
                //results.success +
                firstRow);
            }
        })
            .catch(function (e) {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(
            // results.failure,
            message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbExecuteCarpoolAPIFunction(payload, pool, fnExecuteFunctionString, fnPayloadArray, req, reply, results) {
        var queryString = fnExecuteFunctionString();
        // console.log('executeFunctionString: ' + queryString);
        pool
            .query(queryString, fnPayloadArray(req, payload))
            .then(function (result) {
            var firstRow = '';
            if (result !== undefined && result.rows !== undefined) {
                // result.rows.forEach( val => console.log(val));
                result.rows.forEach(function (val) {
                    return console.log('exec fn: ' + val);
                });
                firstRow = result.rows[0];
            }
            console.error('executed fn: ' + firstRow);
            reply(
            //results.success +
            firstRow);
        })
            .catch(function (e) {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(
            // results.failure,
            message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbExecuteFunction(payload, pool, fnExecuteFunctionString, fnPayloadArray, req, reply, results) {
        var queryString = fnExecuteFunctionString();
        // console.log('executeFunctionString: ' + queryString);
        pool
            .query(queryString, fnPayloadArray(req, payload))
            .then(function (result) {
            var firstRowAsString = '';
            if (result !== undefined && result.rows !== undefined) {
                // result.rows.forEach( val => console.log(val));
                result.rows.forEach(function (val) {
                    return console.log('exec fn: ' + JSON.stringify(val));
                });
                firstRowAsString = JSON.stringify(result.rows[0]);
            }
            console.error('executed fn: ' + firstRowAsString);
            reply(
            //results.success +
            firstRowAsString);
        })
            .catch(function (e) {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(
            // results.failure,
            message, stack);
            reply(results.failure + message).code(500);
        });
    }
    dbExecuteFunctionMultipleResults(payload, pool, fnExecuteFunctionString, fnPayloadArray, req, reply, results) {
        var queryString = fnExecuteFunctionString();
        // console.log('executeFunctionMultipleResultsString: ' + queryString);
        pool
            .query(queryString, fnPayloadArray(req, payload))
            .then(function (result) {
            var firstRowAsString = '';
            var rowsToSend = [];
            if (result !== undefined && result.rows !== undefined) {
                // result.rows.forEach( val => console.log(val));
                result.rows.forEach(function (val) {
                    rowsToSend.push(val);
                });
                // console.log('multiple results: ', rowsToSend);
            }
            console.error('executed fn multiple results: ' + firstRowAsString);
            reply(rowsToSend);
        })
            .catch(function (e) {
            var message = e.message || '';
            var stack = e.stack || '';
            console.error(
            // results.failure,
            message, stack);
            reply(results.failure + message).code(500);
        });
    }
}
exports.PostgresQueries = PostgresQueries;
//# sourceMappingURL=postgresQueries.js.map