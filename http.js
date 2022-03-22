var request = require('request');

// request.post(
//     'https://www.rightdev.co.uk/datascraping/inserthtml.php',
//     { form: { url: 'value', html: 'value' } },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             let json = JSON.parse(body);
//             console.log(json.status);
//         }
//     }
// );

request.get(
    'https://www.rightdev.co.uk/datascraping/geturls.php',
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // let json = JSON.parse(body);
            console.log(response);
            
        }
    }
);