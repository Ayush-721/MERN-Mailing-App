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
    if (false) {

    }else{
      emails = await Email.find({ type: request.params.type });
    }

    return response.status(200).json(emails);
  } catch (error) {
    console.log(error);
    response.status(500).json(error.message);
  }
};
