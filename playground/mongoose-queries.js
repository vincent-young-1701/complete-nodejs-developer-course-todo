const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5b6bbb0f8e579221adf464366';

if(!ObjectID.isValid(id)) {
  return console.log('invalid id');
}

Todo.findById({
  _id: id
}).then((todos) => {
  if(!todo) {
    return console.log("not found");
  }
  console.log('Todos', todos);
}).catch((e) => console.log(e));

Todo.findOne({
  _id: id
}).then((todo) => {
  if(!todo) {
    return console.log("not found");
  }
  console.log('Todo', todo);
}).catch((e) => console.log(e));

Todo.findById(id).then((todo) => {
  if(!todo) {
    return console.log("not found");
  }
  console.log('Todo', todo);
}).catch((e) => console.log(e));