const express = require('express');
const rp = require('request-promise');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/keyaki', (req, res) => {
	const {
		query: { page = 0 }
	} = req;

	(async () => {
		res.send(
			await rp(
				`http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${page}`
			)
		);
	})().catch((err) => {
		console.error(err);
		res.sendStatus(500);
	});
});

app.get('/nogi', (req, res) => {
	const {
		query: { page = 1 }
	} = req;

	(async () => {
		res.send(await rp(`http://blog.nogizaka46.com/?p=${page}`));
	})().catch((err) => {
		console.error(err);
		res.sendStatus(500);
	});
});

app.listen(46001);
