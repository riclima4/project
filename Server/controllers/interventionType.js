import { InterventionTypeModel } from "../models/interventionType.js";

export const getAllInterventionType = async (req, res) => {
  const interventionType = await InterventionTypeModel.findAll();
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
    interventionType.update(interventionTypeUpdated);
    return res.send({ interventionTypeUpdated });
  } else {
    return res.send(
      "Nao existe Tipo de Intervencao com id:" + idInterventionType
    );
  }
};

export const deleteInterventionType = async (req, res) => {
  const idInterventionType = req.params.idInterventionType;
  const interventionType = await InterventionTypeModel.findByPk(
    idInterventionType
  );
  if (interventionType !== null) {
    interventionType.destroy();
    return res.send(
      "Tipo de Intervencao com id:" + idInterventionType + " foi eliminado"
    );
  } else {
    return res.send(
      "Nao existe Tipo de Intervencao com id:" + idInterventionType
    );
  }
};
