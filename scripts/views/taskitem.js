export default Backbone.View.extend({
  template: JST.taskitem,

  isEditing: false,

  events: {
    'click .toggle': 'taskCompleted',
    'click .destroy': 'removeTask',
    'dblclick .task-text': 'editTask',
    'submit .edit-form': 'saveTask'
  },

  initialize: function() {
    this.render();
    this.listenTo(this.model, 'update', this.render);
  },

  render: function() {
    this.$el.html(this.template({
      task: this.model.toJSON(),
      isEditing: this.isEditing
    }));
  },

  taskCompleted: function(e) {
    e.preventDefault();
    console.log(this.$el[0].firstChild);
    this.$el[0].firstChild.className = 'completed';
    this.model.set({active: false, completed: true});
    this.render();
  },

  removeTask: function(e) {
    e.preventDefault();
    this.model.destroy();
  },

  editTask: function(e) {
    e.preventDefault();
    console.log(e.target);
    this.isEditing = true;
    this.render();
  },

  saveTask: function(e) {
    e.preventDefault();
    this.model.set({
      content: this.$('.edit-task-text').val()
    });
    this.isEditing = false;
    this.render();
  }
});
