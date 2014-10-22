Notes = new Mongo.Collection("notes");

if (Meteor.isClient) {
  // counter starts at 0

  Template.hello.helpers({
    foo: function () {
      var note = Notes.findOne();
      return note;
    }
  });

  Template.hello.rendered = function () {
    var note = Notes.findOne();
    if(!note) Notes.insert({text: null});
    else {
      Notes.remove({_id: note._id});
      Notes.insert({text: null}); 
    }
  };

  Template.editable.helpers({
    text: function () {
      return this.text;
    }
  });

  Template.editable.events({
    'blur .editable': function (e) {
      var text = $(e.currentTarget).text();
      
      console.log(this, text);
      Notes.update({_id: this._id}, {$set:{text: text}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
