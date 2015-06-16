import {TaskCollection} from './models/taskmodel';

import TaskList from './views/tasklist';
import ActiveView from './views/activeview';
import CompletedView from './views/completedview';

var Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'all': 'index',
    'active': 'active',
    'completed': 'completed'
  },

  initialize: function() {
    this.collection = new TaskCollection([
      {id: 1, content: "Write a Backbone Application", active: false, completed: true},
      {id: 2, content: "Do something else", active: true, completed: false},
      {id: 3, content: "Do something else again", active: true, completed: false},
      {id: 4, content: "Yet another task to complete", active: true, completed: false},
      {id: 5, content: "I need to create more collections", active: true, completed: false}
    ]);
 },

 index: function() {
   var listView = new TaskList({collection: this.collection});
   $('body').html(listView.el);
 },

 active: function() {
   var activeTasks = this.collection.where({active: true});
   var activeView = new ActiveView({collection: activeTasks});
   $('body').html(activeView.el);
 },

 completed: function() {
   var completedTasks = this.collection.where({completed: true});
   var completedView = new CompletedView({collection: completedTasks});
   $('body').html(completedView.el);
 }

});

var router = new Router();
export default router;
