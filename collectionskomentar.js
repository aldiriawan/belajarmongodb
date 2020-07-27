db.createCollection("komentar")
db.komentar.insertMany([
	{
		username: "aldie3103",
		komentar: "Tidak semua lagu pasaran, contohnya lagu Coldplay",
		post: 5,
	},{
		username: "anggiecantik",
		komentar: "Lagu itu ada yang tidak abadi deh, menurutku ada yang ketinggalan zaman",
		post: 4,
	},{
		username: "yoga15",
		komentar: "Lagu zaman dulu ada yang slow kok",
		post: 3,
	},{
		username: "aldie3103",
		komentar: "Ada beberapa lagu yang ga pasaran selain Coldplay, banyak loh",
		post: 4,
	}
])
//tampilkan semua
db.komentar.find()
//komentar aldie3103
db.komentar.find({
	username: "aldie3103"
})
//komentar dari postingan yoga15
db.komentar.find({
	post: db.posting.findOne({
		username: "yoga15"})._id
})
