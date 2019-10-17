let axios = require('axios');
let util = require('../util')

module.exports = async = {

	setUserAgent: function (software) {
		this.useragent = util.useragent(software)
	},
	/**
	 * 
	 * @param {string} request - The tags you want to search for | max 4
	 */
	noCubFilter: async function (request) {
		request = request.replace(/ /g, '%20');
		let url = `https://e621.net/post/index.json?tags=${request}%20order:random&limit=1`;
		let response = await axios.get(`${url}`, {
			headers: {
				"user-agent": this.useragent || util.useragent
			}
		})
		let {
			tags,
			source,
			score,
			fav_count,
			file_url,
			artist,
			id
		} = response.data[0];
		let data = {
			tags: tags,
			source: source,
			score: score,
			fav_count: fav_count,
			image: file_url,
			artist: artist,
			postID: id
		};

		return data;
	},

	/**
	 * 
	 * @param {string} request - The tags you want to search for | max 3
	 */
	CubFilter: async function (request) {
		request = request.replace(/ /g, '%20');
		let url = `https://e621.net/post/index.json?tags=${request}%20-cub%20order:random&limit=1`;
		let response = await axios.get(`${url}`, {
			headers: {
				"user-agent": util.useragent
			}
		})
		let {
			tags,
			source,
			score,
			fav_count,
			file_url,
			artist,
			id
		} = response.data[0];
		let data = {
			tags: tags,
			source: source,
			score: score,
			fav_count: fav_count,
			image: file_url,
			artist: artist,
			postID: id
		};

		return data;
	}
};

/*
    API Wrapper written by @codepupper
*/