export funtion getDetailUlrs(url) {
	let id = url.split("=")[1];
	let url_arr = [];
	url_arr[0] = url;
	url_arr[1] = "http://conf.cnki.net/WebSite/ImportDate.aspx?conferenceID=" + url;
	url_arr[2] = "http://conf.cnki.net/WebSite/callForConference.aspx?conferenceID=" + url;
	url_arr[3] = "http://conf.cnki.net/WebSite/VenueHotelTraffic.aspx?conferenceID=" + url;
	url_arr[4] = "";
	url_arr[5] = "http://conf.cnki.net/HistoryConference.aspx" + url;
}