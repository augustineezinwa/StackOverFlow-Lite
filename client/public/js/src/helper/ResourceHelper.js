/**
  * @class ResourceHelper
  *
  * @description this class helps with fetching resources from datacenter
  */
class ResourceHelper {
  /**
    * @static
    *
    * @param {string} dataResource - the resource
    * @param {string} resourceField - the attribute of the resource
    * @param {string} resourceId - The id of the resource
    * @param {string} neededData - The actual data needed
    * @returns {object} - binds view to datacenter
    *
    * @description This method checks for a question in history;
    * @memberOf QuestionViewController
    */
  static getInformationFromDataCenter(dataResource, resourceField, resourceId, neededData) {
    const result = dataResource.find(x => +x[resourceField] === +resourceId);
    return result[neededData];
  }
}

export default ResourceHelper;
