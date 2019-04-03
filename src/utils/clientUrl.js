import config from '@/config';

const baseUrl = config.get('baseUrl');
const urls = {
  // returns an asset
  assets: name => `${baseUrl}/assets/${name}`,
}

/**
 * Creates a route with an absolute url from the baseUrl
 * @property {String}   - The route to view an existing visualisation
 * @param {Number} id   - The id of the visualisation
 * @return {String}     - A valid url
 * @example /view/3452
 */




/**
 * Helper class to get Url's for all locat routes
 * {@link http://pragmatic-backbone.com/models-collections-and-data}
 * @author  {@link http://kartoteket.as/team/bard.html Bård Røtzer}
 * @param {String} type       - the type of method to get
 * @param {Mixed}  optional   - All other parameters, just passed on
 */
export default function clientUrl(type) {
  return urls[type] ? urls[type].apply(this, [].slice.call(arguments, 1)) : undefined;
}
