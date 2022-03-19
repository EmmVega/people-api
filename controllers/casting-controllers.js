const Casting = require("../models/casting");
const HttpError = require("../models/httpError");
const User = require("../models/user");

// function createData(
//    id,
//    productor,
//    director,
//    dp,
//    date,
//    title,
//    age,
//    generx,
//    industry,
//    info
// ) {
//    return {
//       id,
//       productor,
//       director,
//       dp,
//       date,
//       title,
//       personal: { age, generx },
//       industry,
//       info,
//    };
// }

// const rows = [
//    createData(
//       1,
//       "SERVER20th Century Films",
//       "Guillermo del Toro",
//       "El chivo",
//       2.14,
//       "The Shape of Water",
//       "35",
//       "Femenina",
//       "Cine"
//    ),
//    createData(
//       2,
//       "Yllusion",
//       "Carlos Vega Mecinas",
//       "Alex Walker",
//       6.5,
//       "Duelo",
//       "25",
//       "Masculino",
//       "Videoclips"
//    ),
//    createData(
//       3,
//       "Fox",
//       "Alfonso Cuaron",
//       "El chivx",
//       8.11,
//       "Gravity",
//       "40",
//       "Femenina",
//       "Cine"
//    ),
//    createData(
//       4,
//       "HBO",
//       "Alejandro Gonzalez Iñarritu",
//       "Ingmar Bergman",
//       12.2,
//       "The Revenant",
//       "45",
//       "Masculino",
//       "Television"
//    ),
//    createData(
//       5,
//       "Netflix",
//       "Enrique Segobiano",
//       "Chespirito",
//       4.7,
//       "El chavo del 8",
//       "20",
//       "Femenina",
//       "Teatro"
//    ),
// ];

// const DUMMY_USERS = [
//    {
//       uid: "userId",
//       email: "test@test.com",
//       password: "password1",
//       castings: [
//          {
//             id: 1,
//             status: "applied",
//          },
//          {
//             id: 3,
//             status: "pinned",
//          },
//          {
//             id: 5,
//             status: "applied",
//          },
//       ],
//    },
// ];

// const DUMMY_CASTINGS = rows;

const getAllCastings = async (req, res, next) => {
   let isCastingDBEmpty;
   try {
      isCastingDBEmpty = (await Casting.find()).length;
   } catch (err) {
      return next(
         new HttpError("Something failed verifying is DB is empty", 500)
      );
   }

   if (!isCastingDBEmpty) {
      DUMMY_CASTINGS.map(async (casting) => {
         const newCast = new Casting({
            productor: casting.productor,
            director: casting.director,
            dp: casting.dp,
            date: casting.date,
            title: casting.title,
            personal: {
               age: casting.personal.age,
               generx: casting.personal.generx,
            },
            industry: casting.industry,
            info: casting.info,
         });

         try {
            await newCast.save();
         } catch (err) {
            return next(new HttpError("Something failed saving to DB", 500));
         }
      });
   }

   let CASTINGS;
   try {
      CASTINGS = await Casting.find();
   } catch (err) {
      return next(new HttpError("Something failed finding all castings", 500));
   }

   // res.json(DUMMY_CASTINGS);
   res.json(CASTINGS);
};

const getCastingDataById = async (req, res, next) => {
   const id = req.params.cid;
   // const casting = DUMMY_CASTINGS.find((c) => {
   //    return c.id.toString() === id;
   // });
   let casting;

   try {
      casting = await Casting.findById(id);
   } catch (err) {
      return next(new HttpError("Something failed getting the casting", 500));
   }

   res.json(casting);
};

const getFilteredCastings = async (req, res, next) => {
   const { ind, gen } = req.query;

   // const filteredCast = DUMMY_CASTINGS.filter((c) => {
   //    return c.industry === ind && c.personal.generx === gen;
   // });

   let filterCastings;
   try {
      filterCastings = await Casting.find({
         industry: ind,
         "personal.generx": gen,
      });
   } catch (err) {
      return next(new HttpError("Something failed filtering castings", 500));
   }

   res.json(filterCastings);
};

const getCastingsByUserId = async (req, res, next) => {
   const { uid } = req.params;

   // const identifiedUser = DUMMY_USERS.find((u) => {
   //    return u.uid === uid;
   // });

   let identifiedUser;
   try {
      identifiedUser = await User.findById(uid);
   } catch (err) {
      return next(new HttpError("Something failed getting the user", 500));
   }

   // identifiedUser.castings.map((userc) => {
   //    identifiedCasting = DUMMY_CASTINGS.find((c) => {
   //       return c.id === userc.id;
   //    });
   //    castings.push({ ...identifiedCasting, status: userc.status });
   // });

   let castings = [];

   identifiedUser.castings.map(async (cid) => {
      try {
         const casting = await Casting.findById(cid);
         castings.push(casting);
      } catch (err) {
         return next(
            new HttpError(
               "Something failed getting the castings of that userId",
               500
            )
         );
      }
   });

   res.json(castings);
};

exports.getAllCastings = getAllCastings;
exports.getCastingDataById = getCastingDataById;
exports.getFilteredCastings = getFilteredCastings;
exports.getCastingsByUserId = getCastingsByUserId;
