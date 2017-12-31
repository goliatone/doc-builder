'use strict';
const extend = require('gextend');
const {basename, join} = require('path');
const download = require('download-git-repo');

const DEFAULTS = {
    clone: false,
    logger: console,
    wrapTarget: true,
};

/**
 * Download or clone a git repository from
 * github, bitbucket, or gitlab.
 * 
 * The format for `repository`:
 * 
 * GitHub - github:owner/name or simply owner/name
 * GitLab - gitlab:owner/name
 * Bitbucket - bitbucket:owner/name
 * 
 * If you want to pull a given branch/tag:
 * - owner/name#my-branch
 * 
 * @param {Object} options Task options
 * @param {String} options.repository Repository identifier
 * @param {String} options.target Target directory
 * @param {Boolean} [options.clone=false] Clone repository or download zip?
 * @param {Boolean} [options.wrapTarget=true] Wrap target path with repository name
 */
module.exports = function(options) {
    options = extend({}, DEFAULTS, options);

    let {repository, target, clone, logger} = options;
    
    if(options.wrapTarget) {  
        let repo = repository.split('#')[0];
        target = join(target, basename(repo));
    }

    logger.info('clone repository %s into target %s ', repository, target);

    //TODO: We should be able to check if it's already 
    //there, then we skip. If we have a --force or --skip-cache
    //then we move on forward.

    return new Promise((resolve, reject) => {
        download(repository, target, {clone}, (err) => {
            if (err) reject(err);
            else resolve(target);
        });
    });
};
