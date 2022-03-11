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

exports.getAllCastings = getAllCastings;
exports.getCastingDataById = getCastingDataById;
exports.getFilteredCastings = getFilteredCastings;
