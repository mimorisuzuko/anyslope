const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/all', (req, res) => {
	const {
		params: { page = 0 }
	} = req;

	request(
		`http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${page}`,
		(err, _, body) => {
			if (err) {
				res.sendStatus(500);
			} else {
				res.send(body);
			}
		}
	);
});

app.listen(46001);
