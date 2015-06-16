import TaskItemView from './taskitem';

export default Backbone.View.extend({
  template: JST.application,

  events: {
    'submit .new-todo-input': 'addTask'
  },

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function() {
    var tasksLeft = this.collection.where({active: true}).length;
    console.log(tasksLeft);
    this.$el.html(this.template({tasks: tasksLeft}));
    this.renderChildren();
  },

  addTask: function() {
    this.collection.add({
      content: this.$('#new-todo').val()
    });
    this.collection.save();
  },

  renderChildren: function(){
    _.invoke(this.children || [], 'remove');

    this.children = this.collection.map(function(child) {
      var view = new TaskItemView({
        model: child
      });
      this.$('#todo-list').append(view.el);
      return view;
    }.bind(this));

    return this;
  },

  remove: function(){
    _.invoke(this.children || [], 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
