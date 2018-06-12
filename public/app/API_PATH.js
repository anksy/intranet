'use strict';

let _API_PATH ={};

_API_PATH.login = window._env.api_url +'login';
_API_PATH.changePassword = window._env.api_url +'change-password';
_API_PATH.updateProfileImage = window._env.api_url +'update-profile-image';
_API_PATH.getProfile = window._env.api_url +'get-profile';
_API_PATH.updateProfile = window._env.api_url +'update-profile';
_API_PATH.resetPassword = window._env.api_url +'reset-password';

//user permission (add and remove user )
_API_PATH.addEmployee   = window._env.api_url +'add-employee';

_API_PATH.listEmployee   = window._env.api_url +'list-employee';
//[GET] [_id:<Login user id>]
_API_PATH.getEmployee   = window._env.api_url +'get-employee'; 
//[GET] [userId:<user_id> ]

_API_PATH.updateAllEmployees   = window._env.api_url +'update-all-employees'; 
//[PUT] {status: "true", users: [id1, id2]}

_API_PATH.updateEmployee   = window._env.api_url +'update-employee'; 
//[PUT] request as add employee

_API_PATH.addCustomer   = window._env.api_url +'add-customer'; 
//[post] request as add customer


_API_PATH.updateCustomer   = window._env.api_url +'update-customer'; 
//[PUT] request as add customer


_API_PATH.listCustomer   = window._env.api_url +'list-customer'; 
//[GET] listCustomer all customer 

_API_PATH.getCustomer   = window._env.api_url +'get-customer'; 
//[GET] get single customer


_API_PATH.updateAllCustomers   = window._env.api_url +'update-all-customers';


/**
 * Settings
 */

_API_PATH.updateSettings = window._env.api_url + 'update-settings';
_API_PATH.getSettings = window._env.api_url + 'get-settings';


_API_PATH.getDirs   = window._env.api_url +'get-dirs'; 
/**
 * getDirs
 * type GET 
 * params [q, folderId ]
 * @type {[type]}
 */


_API_PATH.addDir   = window._env.api_url +'add-dir'; 
/**
 * addDir
 * Type [POST] 
 * data [parent (optional), title ]
 */

_API_PATH.removeDir   = window._env.api_url +'remove-dir'; 
/**
 * removeDir
 * [type : PUT]
 * @type {[folderId]}
 */

_API_PATH.removeDir   = window._env.api_url +'remove-dir'; 
/**removeDir
 * [type : PUT]
 * @type {[folderId]}
 */


_API_PATH.updateDir   = window._env.api_url +'update-dir'; 
/**removeDir
 * [type : PUT]
 * data[ folderId, folder : {title : test} ]
 */


_API_PATH.updateAllDir   = window._env.api_url +'update-all-dir'; 
/**updateAllDir
 * [type : PUT]
 * dirs (array of ids), action (trash,status), actionValue: true or false
 */


_API_PATH.shareDir   = window._env.api_url +'share-dir'; 
/**shareDir
 * [type : PUT]
 * folderId, access (array of user ids)
 */



_API_PATH.upload_file   = window._env.api_url +'upload-file'; 
/**
 * title, file as multipart, parent (folderId, ignore if uploaing into root dir)
 * [type : POST]
 */



_API_PATH.remove_dir   = window._env.api_url +'remove-dir'; 
/**
 * { path: a/b} 
 * [type : PUT]
 */

_API_PATH.share_resources    = window._env.api_url +'share-resources'; 
/**
 * { path: a/b} 
params : { path: a/b/c, access: [_id1, _id2, _id3]}
 */

_API_PATH.get_users_of_dir = window._env.api_url +'get-users-of-dir'; 
/**
	params : { _id , folderId }
*/

_API_PATH.remove_access = window._env.api_url +'remove-access'; 
/**PUT 
	params : { _id, folderId, userId }
*/


_API_PATH.list_leads = window._env.api_url + 'leads';
_API_PATH.addLead = window._env.api_url + 'leads/add';
_API_PATH.editLead = window._env.api_url + 'leads/edit';
_API_PATH.getLead = window._env.api_url + 'leads/single';



_API_PATH.generateQuote = window._env.api_url + 'generate/quote';
/**
 * { path: a/b} 
 * [type : PUT]
 */
_API_PATH.products = 'https://lightingoftomorrow.com/products.php';
/**
 * { path: a/b} 
 * [type : PUT]
 */


window._API_PATH = _API_PATH;