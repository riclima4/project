import { InterventionTypeModel } from "../models/interventionType.js";
import { IntervencaoModel } from "../models/intervencao.js";

export const getAllInterventionType = async (req, res) => {
  const interventionType = await InterventionTypeModel.findAll();
  return res.send({ interventionType });
};
export const getIntType = async (req, res) => {
  const pageSize = req.query.results;
  const page = req.query.page;
  const interventionType = await InterventionTypeModel.findAll({
    offset: parseInt(page) * pageSize,
    limit: parseInt(pageSize),
    subQuery: false,
  });
  return res.send({ interventionType });
};

export const newInterventionType = async (req, res) => {
  const newInterventionType = {
    interventionType: req.body.interventionType,
  };
  await InterventionTypeModel.create(newInterventionType);
  return res.send(newInterventionType);
};

export const updateInterventionType = async (req, res) => {
  const idInterventionType = req.params.idInterventionType;
  const interventionTypeUpdated = {
    interventionType: req.body.interventionType,
  };

  const interventionType = await InterventionTypeModel.findByPk(
    idInterventionType
  );
  if (interventionType !== null) {
    const interventionsArr = await IntervencaoModel.findAll({
      where: { type: parseInt(idInterventionType) },
    });
    if (interventionsArr.length == 0) {
      interventionType.update(interventionTypeUpdated);
      return res.send("Tipo de Intervencao editado");
    } else {
      return res.send("401");
    }
  } else {
    return res.send("401");
  }
};

export const deleteInterventionType = async (req, res) => {
  const idInterventionType = req.params.idInterventionType;
  const interventionType = await InterventionTypeModel.findByPk(
    idInterventionType
  );

  if (interventionType !== null) {
    const interventionsArr = await IntervencaoModel.findAll({
      where: { type: parseInt(idInterventionType) },
    });
    if (interventionsArr.length == 0) {
      interventionType.destroy();
      return res.send("Tipo de Intervencao foi eliminado");
    } else {
      return res.send("401");
    }
  } else {
    return res.send("401");
  }
};
