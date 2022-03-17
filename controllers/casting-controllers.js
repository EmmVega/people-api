function createData(
   id,
   productor,
   director,
   dp,
   date,
   title,
   age,
   generx,
   industry,
   info
) {
   return {
      id,
      productor,
      director,
      dp,
      date,
      title,
      personal: { age, generx },
      industry,
      info,
   };
}

const rows = [
   createData(
      1,
      "SERVER20th Century Films",
      "Guillermo del Toro",
      "El chivo",
      2.14,
      "The Shape of Water",
      "35",
      "Femenina",
      "Cine"
   ),
   createData(
      2,
      "Yllusion",
      "Carlos Vega Mecinas",
      "Alex Walker",
      6.5,
      "Duelo",
      "25",
      "Masculino",
      "Videoclips"
   ),
   createData(
      3,
      "Fox",
      "Alfonso Cuaron",
      "El chivx",
      8.11,
      "Gravity",
      "40",
      "Femenina",
      "Cine"
   ),
   createData(
      4,
      "HBO",
      "Alejandro Gonzalez Iñarritu",
      "Ingmar Bergman",
      12.2,
      "The Revenant",
      "45",
      "Masculino",
      "Television"
   ),
   createData(
      5,
      "Netflix",
      "Enrique Segobiano",
      "Chespirito",
      4.7,
      "El chavo del 8",
      "20",
      "Femenina",
      "Teatro"
   ),
];

const DUMMY_USERS = [
   {
      uid: "userId",
      email: "test@test.com",
      password: "password1",
      castings: [
         {
            id: 1,
            status: "applied",
         },
         {
            id: 3,
            status: "pinned",
         },
         {
            id: 5,
            status: "applied",
         },
      ],
   },
];

let DUMMY_CASTINGS = rows;

const getAllCastings = (req, res, next) => {
   res.json(DUMMY_CASTINGS);
};

const getCastingDataById = (req, res, next) => {
   const id = req.params.cid;
   const casting = DUMMY_CASTINGS.find((c) => {
      return c.id.toString() === id;
   });
   res.json(casting);
};

const getFilteredCastings = (req, res, next) => {
   const { ind, gen } = req.query;
   const filteredCast = DUMMY_CASTINGS.filter((c) => {
      return c.industry === ind && c.personal.generx === gen;
   });
   if (!filteredCast) console.log("NO HAY");
   res.json(filteredCast);
};

const getCastingsByUserId = (req, res, next) => {
   const { uid } = req.params;

   const identifiedUser = DUMMY_USERS.find((u) => {
      return u.uid === uid;
   });

   let castings = [];

   identifiedUser.castings.map((userc) => {
      identifiedCasting = DUMMY_CASTINGS.find((c) => {
         return c.id === userc.id;
      });
      castings.push({ ...identifiedCasting, status: userc.status });
   });

   res.json(castings);
};

exports.getAllCastings = getAllCastings;
exports.getCastingDataById = getCastingDataById;
exports.getFilteredCastings = getFilteredCastings;
exports.getCastingsByUserId = getCastingsByUserId;
