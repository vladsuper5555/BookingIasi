/* example
*a dbconfig.js file might be needed (extra: read about connectionPooling / other efficiency aspects etc.)

import oracledb ...
function savePanorama(panorama - probably an Object Literal / JSON) {
    ...
    'INSERT INTO ...
}

function getPanorama(id) {
    ...
}

export {

}

--- in controller, we import the functions and use them accordingly
*await/async might be required
*/