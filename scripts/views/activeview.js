import TaskItemView from './taskitem';

export default Backbone.View.extend({
  template: JST.active,

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function(tasks) {
    var activeTasks = this.collection.length;
    this.$el.html(this.template({tasks: activeTasks}));
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
  }
});
