db.createCollection(musik)
//memasukkan data banyak sekaligus tanpa PK
db.musik.insertMany([
	{
		title: "A Sky Full of Stars",
		artist: "Coldplay",
		year: 2014,
		rating : 4,
	},{
		title: "We Will Rock You",
		artist: "Queen",
		year: 1977,
		rating : 5,
	},{
		title: "We Are The Champions",
		artist: "Queen",
		year: 1977,
		rating : 5,
	},{
		title: "Orphans",
		artist: "Coldplay",
		year: 2019,
		rating : 4,
	},{
		title: "Daddy",
		artist: "Coldplay",
		year: 2019,
		rating : 3,
	},{
		title: "Marry You",
		artist: "Bruno Mars",
		year: 2011,
		rating : 4,
	},{
		title:"Yesterday",
		artist:"The Beatles",
		year: 1965,
		rating : 5,
	}
])

//cari semua dokumen musik
db.musik.find()

//cari musik rating 4
db.musik.find({
	rating: 5
})
//cari musik artis QUeen
db.musik.find({
	artist: "Queen"
})
//cari musik rating 5 dan Queen
db.musik.find({
	rating: 5,
	artist: "Queen"
})
//cari musik yang rilis tahun di atas tahun 2000
db.musik.find({
	year:{
		$gt: 2000
	}
})
//cari musik yang rilis antara tahun 2010 dan 2015
db.musik.find({
	year:{
		$gte:2010,
		$lte:2015
	}
})
//cari musik yang rilis kurang dari tahun 1990 atau lebih dari tahun 2010
db.musik.find({
	$or:[{
		year: {
			$lt:1990}
		},{
			year:{
				$gt:2010}
		}
	]
})
//cari judul lagu yang ada "WE" tidak case sensitive
db.musik.find({
    title: {
        $regex: /we/,
        $options: "i"
    }
})
//mau find tanpa object id
db.musik.find({
	artist: "Queen"
},{
	_id: 0
})
//mau tampilkan tahun saja,coldlay rilis tahun berapa saja
db.musik.find({
	artist: "Coldplay"
},{
	year:1
})
//kalau mau id hilang
db.musik.find({
	artist: "Coldplay"
},{
	_id: 0,
	title: 0,
	artist: 0,
	rating: 0
})
// cari yang rilis di tahun kelipatan 5
db.musik.find({ 
    year: { 
        $mod: [5, 0]
    }
},{
	_id: 0
})
//yang tidak di tahun kelipatan 5
db.musik.find({
	year:{
		$not:{
			$mod: [5, 0]
		}
	}
},{
	_id: 0
})
//cari dengan Index lebih cepat, untuk pencarian teks lebih cepat
db.musik.createIndex({
    title: "text"
});
//cari marry OR you
db.musik.find({
    $text: {
        $search: "you marry"
    }
},{
	_id: 0
});
//cari Marry You
db.musik.find({
    $text: {
        $search: '"Marry You"'
    }
},{
	_id: 0
});
//cari Marry tapi not You
db.musik.find({
    $text: {
        $search: "marry -you"
    }
},{
	_id: 0
});
//cek pakai index atau gak
db.musik.find({
    $text: {
        $search: '"Marry You"'
    }
}).explain()
//tidak pakai index
db.musik.find({
	year:{
		$gte:2010,
		$lte:2015
	}
}).explain()
//insert title doang integer pula
db.musik.insertOne({
	title:2000
})
// hapus field
db.musik.deleteOne({
	title:2000
})
//agar tidak kosong dan title artis string year dan rating tidak diisi integer (validation)
db.runCommand({
	collMod:"musik",
	validationAction: "error",
	validator:{
		$jsonSchema:{
			bsonType: "object",
            required: ["title", "artist", "year", "rating"],
            properties: {
                title: {
                    bsonType: "string",
                    description: "Must be a string"
                },
                artist: {
                    bsonType: "string",
                    description: "Must be a string"
                },
                year: {
                    bsonType: "int",
                    description: "Must be a int"
                },
                rating: {
                    bsonType: "int",
                    description: "Must be a int"
                }
            }
		}
	}
})
//insert salah
db.musik.insertOne({
	title: "Love You",
	artist: "We",
	year: "2010",
	rating: 4
})
//insert benar
db.musik.insertOne({
	title: "Love You",
	artist: "We",
	year: 2010,
	rating: 4
})
