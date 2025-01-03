const Captain = require('../models/captain.model');
const {default : httpStatus} = require('http-status');
const ApiError = require('../utils/ApiError');


/**
 * Create a new captain
 * @param {Object} captainData - Data for the new captain
 * @returns {Promise<Object>} The created captain
 */
exports.createCaptain = async (captainData) => {
    if (await Captain.isEmailTaken(captainData.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const hashedPassword = await Captain.hashPassword(captainData.password);
    const captain = new Captain({
        ...captainData,
        password: hashedPassword
    });
    return await captain.save();
};

/**
 * Login a Captain
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Captain>}
 */
exports.loginCaptainWithEmailAndPassword = async (email, password) => {
    const captain = await Captain.findOne({ email }).select('+password');
    if (!captain) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid credentials');
    }
    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }
    return captain;
  };
  



/**
 * Update captain by id
 * @param {ObjectId} captainId
 * @param {Object} updateBody
 * @returns {Promise<Object>}
 */
exports.updateCaptain = async (captainId, updateBody) => {
    const captain = await Captain.findById(captainId);
    if (!captain) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Captain not found');
    }
    if (updateBody.email && (await Captain.isEmailTaken(updateBody.email, captainId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(captain, updateBody);
    await captain.save();
    return captain;
};

exports.deleteCaptain = async (captainId) => {
    const captain = await Captain.findById(captainId);
    if (!captain) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Captain not found');
    }
    await captain.remove();
    return captain;
}


