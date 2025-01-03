const Captain = require('../models/captain.model');
const httpStatus = require('http-status');


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
 * Get captain by id
 * @param {ObjectId} captainId
 * @returns {Promise<Object>}
 */
exports.getCaptain = async (captainId) => {
    return await Captain.findById(captainId);
}


/**
 * Get captains
 * @returns {Promise<Object>}
 */

exports.getCaptains = async () => {
    return await Captain.find();
}


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

exports.getCaptainByEmail = async (email) => {
    return await Captain.findOne({ email });
}
