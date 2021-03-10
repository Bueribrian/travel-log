const express = require("express");
const EntryLog = require("../models/entry");
const router = express.Router();

/*TODO
    Make cache and time limit
*/

router.get("/", async (req, res, next) => {
  let entries;

  try {
      entries = await EntryLog.find({});
      res.status(200).json({
        message: "Entries",
        data: entries.length <= 0 ? false : entries,
        status: 200,
      });
  } catch (err) {
    next(err);
  }
});

router.get('/find/:query', async (req, res, next) => {
  let query = req.params.query
  const regex = new RegExp(query, 'i') 
  let entries
  try{
    entries = await EntryLog.find({title:{$regex: regex}});
    res.status(200).json({
      message: "Entries",
      data: entries,
      status: 200,
    });
  }catch (err) {
    next(err);
  }
})

router.post("/", async (req, res, next) => {
  console.log(req.body)
  try {
    let newEntry = await new EntryLog({ ...req.body }).save();
    console.log(newEntry);
    res.status(200).json(req.body);
  } catch (err) {
    if (err) next(err);
  }
});

router.delete('/delete/all', async( req,res, next) =>{
  try {
    let entriesDeleted = await EntryLog.deleteMany({});
    res.status(200).json({ message: "Entries deleted", entriesDeleted });
  } catch (err) {
    if (err) next(err);
  }
})

router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    res.json({ message: "Please provide an number id" });
  }
  try {
    let entryDeleted = await EntryLog.findByIdAndDelete(id);
    res.status(200).json({ message: "Entry deleted", entryDeleted });
  } catch (err) {
    if (err) next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  if (!id) {
    res.json({ message: "Please provide an id" });
  }

  try {
    let updatedEntry = await EntryLog.findByIdAndUpdate(id, { ...data });
    res.status(200).json({ message: "Entrie Updated", updatedEntry });
  } catch (err) {
    if (err) next(err);
  }
});

module.exports = router;
