import PracticalModel from '../model/practical.js';
import SubjectModel from '../model/subject.js';

export const createPractical = async (req, res) => {
  try {
    const { subjectId, email, Practical } = req.body;

    // Check if the subject exists
    const Subjectinfo = await SubjectModel.findById(subjectId);

    if (!Subjectinfo) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Create a new Practical object
    const PracticalObj = new PracticalModel({
      Subject: subjectId,
      email,
      Practical,
    });

    // Save the Practical document
    const savedPractical = await PracticalObj.save();

    // Update the Subject to include the new Practical
    const updatedSubject = await SubjectModel.findByIdAndUpdate(
      subjectId,
      { $push: { practicals: savedPractical._id } }, // assuming 'practicals' field exists in Subject model
      { new: true }
    ).populate("practicals") // Populates the 'practicals' field with Practical details
      .exec();

    res.json({ Subject: updatedSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while adding Practical" });
  }
};

export const getAllPractical = async (req, res) => {
  try {
    const practicals = await PracticalModel.find()
      .populate("Subject") // Populates the 'Subject' field with subject details
      .populate("enroll"); // Populates the 'enroll' field with Enroll details

    res.json({ practicals });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error while fetching practicals" });
  }
};
