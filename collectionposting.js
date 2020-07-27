//membuat db postingan dengan tentukan primari keynya
db.createCollection("posting")
db.posting.insertMany([
	{
		_id: 1,
		username: "anggiecantik",
		judul: "Laguku yang asik",
		isi: "LAgu ini menurutku mantep banget, suka deh",
	},{
		_id: 2,
		username: "aldie3103",
		judul: "Lagu Zaman Sekarang",
		isi: "LAgu zaman Sekarang kurang, kebanyakan EDM",
	},{
		_id: 3,
		username: "anggiecantik",
		judul: "Pendapatku",
		isi: "Lagu zaman dulu lebih ngerock",
	},
	{
		_id: 4,
		username: "yoga15",
		judul: "Lagu abadi",
		isi: "LAgu yang abadi, tidak lekang oleh waktu",
	},
	{
		_id: 5,
		username: "yoga15",
		judul: "Lagu Pasaran",
		isi: "Kebanyakan lagu sekarang pasaran, hype bentar doang",
	}
])

//tampilkan semua postingan
db.posting.find()
//tampilkan posting dari anggiecantik
db.posting.find({
	username:"anggiecantik"
})
//tampilkan posting dari Prayoga
db.posting.find({
	"nama_lengkap.nama_belakang":"prayoga"
})
//tampilkan judul dengan kata "Lagu"
db.posting.find({
	judul:{
		$regex: /lagu/,
		$options:"i"
	}
})
//judul tidak ada lagu
db.posting.find({
	judul: {
	$not: {
		$regex: /lagu/,
		$options:"i"
	}
	}	
})
