import TaskItemView from './taskitem';

export default Backbone.View.extend({
  template: JST.completed,

  events: {
    'click #clear-completed': 'clearCompleted'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    var completedTasks = this.collection.length;
    this.$el.html(this.template({tasks: completedTasks}));
    this.renderChildren();
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
  },

  clearCompleted: function() {
    this.collection.length = 0;
    this.render();
  }
});
