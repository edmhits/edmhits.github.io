(() => {

	let Track = (track_name, track_author, link) => {
		return {
			name: track_name,
			author: track_author,
			url: link
		};
	}

	let soundList = [];
	let track_id = parseInt(localStorage['track_id']) || 0;
	let is_looped = false;

	soundList.push(Track('UNO', 'Little Big', 'https://z1.fm/download/26443324'));
	soundList.push(Track('Animals', 'Martin Garrix', 'https://z1.fm/download/2747183'));
	soundList.push(Track('Jump', 'Ray Nr', 'https://z1.fm/download/15840670'));
	soundList.push(Track('Does It Matter', 'Janieck', 'https://z1.fm/download/16666073'));
	soundList.push(Track('Reality', 'Lost Frequencies Feat. Janieck Devy', 'https://z1.fm/download/3168236'));
	soundList.push(Track('Madison', 'Alle Farben Feat. Janieck', 'https://z1.fm/download/24445990'));
	soundList.push(Track('Feel The Love', 'Janieck', 'https://z1.fm/download/8917469'));
	soundList.push(Track('The World Is Mine', 'David Guetta', 'https://z1.fm/download/3158295'));
	soundList.push(Track('Love Do not Let Me Go', 'David Guetta', 'https://z1.fm/download/3696914'));
	soundList.push(Track('Boom Boom', 'David Guetta', 'https://z1.fm/download/3756206'));
	soundList.push(Track('Sexy Beatch', 'Akon David Guetta', 'https://z1.fm/download/3791505'));
	soundList.push(Track('Stole The Show', 'Kygo Feat. Parson James', 'https://z1.fm/download/3735259'));
	soundList.push(Track('Born To Be Yours', 'Kygo & Imagine Dragons', 'https://z1.fm/download/21653628'));
	soundList.push(Track('Happy Now', 'Kygo', 'https://z1.fm/download/22138331'));
	soundList.push(Track('Stargazing', 'Kygo Feat Justin Jesso', 'https://z1.fm/download/17642086'));
	soundList.push(Track('Summer Days', 'Martin Garrix Feat. Macklemore & Patrick Stump Of Fall Out Boy', 'https://z1.fm/download/24053782'));
	soundList.push(Track('Home', 'Martin Garrix, Bonn', 'https://z1.fm/download/24693329'));
	soundList.push(Track('Hold On', 'Martin Garrix X Matisse & Sadko Feat. Michel Zitron', 'https://z1.fm/download/26133235'));
	soundList.push(Track('Forever', 'Martin Garrix & Matisse & Sadko', 'https://z1.fm/download/21941303'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));
	// soundList.push(Track('', '', 'https://z1.fm'));


	// Заходишь на яндекс.музыка, F12, Network, Media и запускаешь песни. Справа в списке появляется ссылка. Copy -> copy adress
	// soundList.push(Track('название', 'исполнитель', 'ссылка'))

	let audio = new Audio();

	try {
		audio.src = soundList[track_id].url;
	}
	catch(e)
	{
		audio.src = soundList[0].url;
	}


	audio.currentTime = parseInt(localStorage['track_time']) || 0;


	document.getElementById('t_name').innerText = soundList[track_id].name;
	document.getElementById('t_author').innerText = soundList[track_id].author;

	let pl = () => {
		document.getElementById('bod').style.backgroundImage ="url(es.gif)";

		document.getElementById('button-play').src = "pause.png";
		audio.play();
	}
	let st = () => {
		document.getElementById('bod').style.backgroundImage ="url(esa.png)";

		document.getElementById('button-play').src = "play.png";
		audio.pause();
	}

	let replay = () => {
		document.getElementById('t_name').innerText = soundList[track_id].name;
		document.getElementById('t_author').innerText = soundList[track_id].author;
		localStorage['track_id'] = track_id;

		audio.src = soundList[track_id].url;
		pl();
	}



	let previous = () => {
		track_id -= 1;
		if(track_id < 0) track_id = soundList.length - 1;

		replay();
	}

	let next = () => {
		track_id += 1;
		if(track_id >= soundList.length) track_id = 0;
		if(track_id < 0) track_id = soundList.length - 1;

		replay();
	}

	audio.addEventListener('ended', () => {
		if(is_looped) pl();
		else next();
	});


	document.getElementById('button-play').addEventListener('click', () => {
		if(audio.paused)
		{
			pl();
		}
		else
		{
			st();
		}
	});
	document.getElementById('button-previous').addEventListener('click', previous);
	document.getElementById('button-next').addEventListener('click', next);
	document.getElementById('button-repeat').addEventListener('click', () => {
		is_looped = 1 - is_looped;

		document.getElementById('button-repeat').style.filter = (is_looped ? 'grayscale(.50)' : '');
	});

	setInterval(() => {
		localStorage['track_time'] = audio.currentTime;
	}, 500);

	window.x = audio;
})();