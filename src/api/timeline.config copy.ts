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
		"baseLineOffset": 0.15,
		"rulerMarkerWidth": 70,
		"rulerMarkers": [
			{
				"time": null,
				"position": null
			}
		]
	},
	//得克萨斯奥斯汀[-97.73,30.28]
	//武汉[114.31, 30.52]
	//北京[116.40, 39.90]
	//上海[121.48, 31.22]
	"flags": [
		{
			"time": "2024-07-24",
			"duration": 18,
			"location": [-122.0, 37.5],
			"title": "介绍西游",
            "content": "nvidia在reddit向外国网友详细介绍西游记剧情",
            "img": "http://127.0.0.1:8080/0.png",
            "row": 1,
            "order": 0
		},
		{
            "time": "2024-08-16",
            "duration": 9.01,
            "location": [116.38,39.9],
            "title": "追光技术",
            "content": "英伟达官方微博介绍，黑神话支持追光重建技术",
            "img": "http://127.0.0.1:8080/1.png",
            "row": 1,
            "order": 1
        },
        {
            "time": "2024-08-20",
            "duration": 2.06,
            "location": [
                114.13,
                22.62
            ],
            "title": "发布",
            "content": "黑神话悟空全球发售！",
            "img": "http://127.0.0.1:8080/2.png",
            "row": 1,
            "order": 2
        },
        {
            "time": "2024-08-22",
            "duration": 3.71,
            "location": [
                -74.0,
                40.72
            ],
            "title": "股价暴涨",
            "content": "黑神话发售前后，nvidia股价累计上涨30%，增量5万亿人民币",
            "img": "http://127.0.0.1:8080/3.png",
            "row": 1,
            "order": 3
        },
        {
            "time": "2024-08-23",
            "duration": 7.78,
            "location": [
                114.13,
                22.62
            ],
            "title": "公布销量",
            "content": "保守估计，至少收入27亿",
            "img": "http://127.0.0.1:8080/4.png",
            "row": 1,
            "order": 4
        },
        {
            "time": "2024-08-27",
            "duration": 15.34,
            "location": [
                116.38,
                39.9
            ],
            "title": "GPU大卖",
            "content": "除nvidia，intel、amd以及国产的摩尔线程都在为黑神话迭代驱动",
            "img": "http://127.0.0.1:8080/5.png",
            "row": 1,
            "order": 5
        }
	]

}

export default timelineConfig;