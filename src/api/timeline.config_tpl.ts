const timelineConfig = {
	"timeline": {
		"containerId": "timeline_container",
		"containerWidth": null,
		"containerHeight": 220,
		"activeFlag": 0,
		"offset": 0,
		"flagWidth": 120,
		"init": false,
		"rulerNum": 5,
		"baseLineOffset": 0.5,
        "flagOffsetWidth": 1,
		"rulerMarkerWidth": 70,
		"rulerMarkers": [
			{
				"time": null,
				"position": null,
                "timeType": null,
                "content": null,
			}
		]
	},
	//得克萨斯奥斯汀[-97.73,30.28]
	//武汉[114.31, 30.52]
	//北京[116.40, 39.90]
	//上海[121.48, 31.22]
    //[{'city': '成都', 'location': '["30°40\'", "104°04\'"]'}, {'city': '上海', 'location': '["31°14\'", "121°29\'"]'}, {'city': '广州', 'location': '["23°08\'", "113°17\'"]'}, {'city': '香港', 'location': '["22°19\'", "114°10\'"]'}, {'city': '曲阜', 'location': '["35°37\'", "117°08\'"]'}, {'city': '北京', 'location': '["39°54\'", "116°23\'"]'}]
	"flags": [
		{
			"time": "2023-03-10",
			"duration": 18,
			"location": [1,2],
			"locationName": "",
			"title": "介绍西游",
            "content": "nvidia在reddit向外国网友详细介绍西游记剧情",
            "img": "http://127.0.0.1:8080/0.png",
            "row": 1,
            "order": 0
		},
        {
			"time": "2024-08-24",
			"duration": 18,
			"location": [1,2],
			"locationName": "洛阳",
			"title": "介绍西游",
            "content": "nvidia在reddit向外国网友详细介绍西游记剧情",
            "img": "http://127.0.0.1:8080/0.png",
            "row": 1,
            "order": 0
		},
        {
			"time": "2024-09-24",
			"duration": 18,
			"location": [1,2],
			"locationName": "洛阳",
			"title": "介绍西游",
            "content": "nvidia在reddit向外国网友详细介绍西游记剧情",
            "img": "http://127.0.0.1:8080/0.png",
            "row": 1,
            "order": 0
		}
	]

}

export default timelineConfig;