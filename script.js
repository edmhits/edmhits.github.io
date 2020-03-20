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
	soundList.push(Track('Faded', 'Alan Walker', 'https://s134sas.storage.yandex.net/get-mp3/1f93124c5fc3de989422be5150ff4990/0005a1443583eaa8/rmusic/U2FsdGVkX1_A-ZR9KERKm612JNEs2fBGTqjcV3_nLH9v_7s7f6B95Wf66HLdTaIH6KS51ltl6PPTD-gbfJ8SW7LNE3YAB8rKt2rLzFZDAOM/de658f40354d99e6f01fc8d84622e0bb5eb8c93c0934a6fba5fd8cb1fb67c4c5?track-id=25995209&play=false'));
	soundList.push(Track('Alone', 'Marshmello', 'https://s100vla.storage.yandex.net/get-mp3/83fc3e122c4fb84cfa4a54ca792aa5ea/0005a1443372745a/rmusic/U2FsdGVkX18_nZKac_xZgyJxFCsOrmzi9SvSAbeCHefDajQ789Er2xMC2MGfBfMdlwRWOg8EBm4Ft395nBvZPn59aM6z7M3-ArlXGnIBr_g/7ef8f71e2d74b6a3317c3985ad42869c71d7fa3e48ad88b700c23450aecdd02c?track-id=28885150&play=false'));
	soundList.push(Track('Summer Days', 'Martin Garrix', 'https://s137vla.storage.yandex.net/get-mp3/1ffa53bd18e60d0f5a8e3794f3adc54a/0005a14430cf33fd/rmusic/U2FsdGVkX18q9c_RsycjU2xxxCibzl1-l_FJrrqY080Ss3CX7yR08O0wAWsm0k4oauevUKd8YrkFiqC5acy4XApK2svUIJjYdpIYjt6zi-M/470302899d0c38279716dcb2dad49a1d6961a5117cb66307e8987ca80f2e584c?track-id=52396212&play=false'));


	// Заходишь на яндекс.музыка, F12, Network, Media и запускаешь песни. Справа в списке появляется ссылка. Copy -> copy adress
	// soundList.push(Track('название', 'исполнитель', 'ссылка'))

	let audio = new Audio();
	audio.src = soundList[track_id].url;
	audio.currentTime = parseInt(localStorage['track_time']) || 0;


	document.getElementById('t_name').innerText = soundList[track_id].name;
	document.getElementById('t_author').innerText = soundList[track_id].author;

	let pl = () => {
		document.getElementById('button-play').src = "pause.png";
		audio.play();
	}
	let st = () => {
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