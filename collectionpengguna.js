//username yang bernama tengah pakai embedded document
db.pengguna.insertMany([
	{
		username: "aldie3103",
		jenis_kelamin: "L",
		nama_lengkap: {
			nama_depan: "Aldi",
			nama_belakang: "Riawan",
		}
	},{
		username: "yoga15",
		jenis_kelamin: "L",
		nama_lengkap: {
			nama_depan: "Erwin",
			nama_belakang: "Prayoga",
		}
	},{
		username: "anggiecantik",
		jenis_kelamin: "P",
		nama_lengkap: {
			nama_depan: "Anggita",
			nama_tengah: "Irent",
			nama_belakang: "Octaviana",
		}
	},{
		username: "davinaade",
		jenis_kelamin: "P",
		nama_lengkap: {
			nama_depan: "Davina",
			nama_tengah: "Ade",
			nama_belakang: "Riawan",
		}
	}
])
//tampilkan data pengguna
db.pengguna.find()
//tampilkan data dengan username yoga15
db.pengguna.find({
	username:"yoga15"
})
//tampilkan data dengan nama depan Erwin
db.pengguna.find({
	"nama_lengkap.nama_depan": "Erwin"
})
//nama belakang Riawan
db.pengguna.find({
	"nama_lengkap.nama_belakang": "Riawan"
})
// Mau update agar ada email pengguna
db.pengguna.updateMany({}, [
    {
        $set: {
            email: {
                "$concat": ["$username", "@" , "contoh.com"]
            }
        }
    }
])
//validasi
db.runCommand({
	collMod:"pengguna",
	validationAction: "error",
	validator:{
		$jsonSchema:{
			bsonType: "object",
            required: ["username", "jenis_kelamin", "nama_lengkap"],
            properties: {
                username: {
                    bsonType: "string",
                    description: "Must be a string"
                },
                jenis_kelamin: {
                    enum: ["L", "P"],
                    description: "Can only be one of enum values"
                },
                nama_lengkap: {
                    bsonType: "object",
                    required: ["nama_depan", "nama_belakang"],
                    properties: {
                        nama_depan: {
                            bsonType: "string",
                            description: "Must be a string"
                        },
                        nama_tengah: {
                            bsonType: "string",
                            description: "Must be a string"
                        },
                        nama_belakang: {
                            bsonType: "string",
                            description: "Must be a string"
                        }
                    }
                }
            }
		}
	}
})
//insert pengguna salah
db.pengguna.insertOne({
	username: "ade15",
	jenis_kelamin :" ",
	nama_lengkap: {
			nama_depan: "Tabita",
			nama_belakang: "Ade",
		}
})
//insert pengguna benar
db.pengguna.insertOne({
	username: "ade29",
	jenis_kelamin :"P",
	nama_lengkap: {
			nama_depan: "Tabita",
			nama_belakang: "Ade",
		}
})
//drop pengguna
db.pengguna.deleteOne({
	username:"ade29"
})
