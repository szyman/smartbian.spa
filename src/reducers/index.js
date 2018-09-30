import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserAuthReducer from './reducer_userAuth';
import UserListReducer from './reducer_userList';
import ItemListReducer from './reducer_itemList';

const rootReducer = combineReducers({
  userAuth: UserAuthReducer,
  userList: UserListReducer,
  itemList: ItemListReducer,
  form: formReducer
});

export default rootReducer;