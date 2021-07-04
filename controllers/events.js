const dbEvents = require("../models/events");

const getEvent = async (req, res) => {
  const events = await dbEvents.find().populate("user", "name");

  res.json({
    ok: true,
    msj: "success",
    events,
  });
};
//////////////////////////////////////////////////////////////
const newEvent = async (req, res) => {
  const events = new dbEvents(req.body);
  try {
    events.user = req.uid;
    await events.save();

    res.status(201).json({
      ok: true,
      msj: "success",
      events,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msj: "there was an error with the document",
    });
  }
};
//////////////////////////////////////////////////////////////

const updateEvent = async (req, res) => {
  const idReq = req.params.id;
  const uid = req.uid;

  try {
    const eventId = await dbEvents.findById(idReq);

    if (!eventId) {
      res.status(401).json({
        ok: true,
        msj: "Request Invalid",
        id: eventId,
      });
    }
    if (eventId.user.toString() !== uid) {
      res.status(401).json({
        ok: true,
        msj: "you cannot edit this document",
        id: eventId,
      });
    }
    const newData = {
      ...req.body,
      user: uid,
    };

    //aqui se guarda
    await dbEvents.findByIdAndUpdate(eventId, newData, {
      new: true,
    });

    res.status(201).json({
      ok: true,
      msj: "Data Updated",
      id: eventUpdate,
    });
  } catch (error) {
    res.status(404).json({
      ok: true,
      msj: "Update failed",
      id: idReq,
    });
  }
};
//////////////////////////////////////////////////////////////

const deleteEvent = async (req, res) => {
  const idReq = req.params.id;
  const uid = req.uid;

  try {
    const eventId = await dbEvents.findById(idReq);

    if (!eventId) {
      res.status(401).json({
        ok: true,
        msj: "Request Invalid",
        id: eventId,
      });
    }
    if (eventId.user.toString() !== uid) {
      res.status(401).json({
        ok: true,
        msj: "you cannot edit this document",
        id: eventId,
      });
    }

    //aqui se elimina
    const eventDelete = await dbEvents.findByIdAndDelete(eventId);

    res.status(201).json({
      ok: true,
      msj: "Succes",
    });
  } catch (error) {
    res.status(404).json({
      ok: true,
      msj: "Problem deleting",
      id: idReq,
    });
  }
};
//////////////////////////////////////////////////////////////

module.exports = {
  getEvent,
  newEvent,
  updateEvent,
  deleteEvent,
};
