const { WORK_COMPATIBILITY } = require("../data/zodiac");

const getCompatibleSigns = (sign) => {
  const compatibleSigns = WORK_COMPATIBILITY.filter(
    (pair) =>
      (pair.pair[0] === sign || pair.pair[1] === sign) && pair.compatible
  ).map((pair) => (pair.pair[0] === sign ? pair.pair[1] : pair.pair[0]));
  return compatibleSigns;
};

module.exports = { getCompatibleSigns };
