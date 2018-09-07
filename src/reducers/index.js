import { combineReducers } from 'redux';
import UserAuthReducer from './reducer_userAuth';
import UserListReducer from './reducer_userList';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  userAuth: UserAuthReducer,
  userList: UserListReducer,
  form: formReducer
});

export default rootReducer;