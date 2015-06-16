var Task = Backbone.Model.extend({
  defaults: {
    id: '',
    content: '',
    active: true,
    completed: false
  }
});

var TaskCollection = Backbone.Collection.extend({
  model: Task,
  url: 'tiny-lasagna-server.herokuapp.com/collections/adetasks'
});

export default {Task, TaskCollection};
