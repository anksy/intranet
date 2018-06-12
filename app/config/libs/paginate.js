'use strict';
const path    = require('path'),
    config  = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    _       = require('lodash');
    
/* This function will return all the paging options
* return @object
* paging = {
    'page' : page,
    'current' : count(results), // currently showing results count
    'count' : count,
    'prevPage' : (page > 1),
    'nextPage' : (count > ($page * $limit)),
    'pageCount' : pageCount,
    'limit' : limit
}
*/
function _paging(count, result, page, limit=config.listing.limit){
    let countResult = (result) ? result.length : 0,
        pageCount = countResult !== 0 ? parseInt(_.ceil(countResult / config.listing.limit)) : 0;
    
    return {
        page: page,
        current: countResult,
        count: count,
        prevPage: (page > 1),
        nextPage: (count > (page * limit)),
        pageCount: pageCount,
        limit: limit
    };
}

module.exports._paging = _paging;