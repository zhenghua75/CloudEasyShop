import {
	combineReducers
} from 'redux';
import auth from './auth';
import profile from './profile';
import vouch from './vouch';
import myVouch from './myVouch';
import currentStock from './currentStock';
import message from './message';
import report from './report';

const rootReducer = combineReducers({
	auth,
	profile,
	vouch,
	myVouch,
	currentStock,
	message,
	report
});

export default rootReducer;