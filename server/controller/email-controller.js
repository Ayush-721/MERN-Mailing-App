import Email from "../model/email.js";

export const saveSentEmails = (request, response) => {
  try {
    const email = new Email(request.body);
    email.save(); //saves in the database
    response.status(200).json('email saved succesfully');
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const getEmails = async (request, response) => {
  try {
    let emails;
    // console.log(request.params.type);
    if (request.params.type === 'bin') {
      emails = await Email.find({ bin: true })
    } else if (request.params.type === 'allmail') {
      emails = await Email.find({});
    }
    else {
      emails = await Email.find({ type: request.params.type });
    }

    return response.status(200).json(emails);
  } catch (error) {
    console.log(error);
    response.status(500).json(error.message);
  }
};

export const moveEmailsToBin = async (request, response) => {
  try {
    await Email.updateMany({ _id: { $in: request.body } }, { $set: { bin: true, starred: false, type: '' } });
    return response.status(200).json('emails delted successfully');
  } catch (error) {

    console.log(error);
    response.status(500).json(error.message);
  }
}
