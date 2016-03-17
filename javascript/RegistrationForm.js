var RegistrationForm = function () {

  var customer = {
    personalInfo: {
      title: ko.observable(),
      firstName: ko.observable(),
      middleName: ko.observable(),
      lastName: ko.observable()
    },
    contactDetails: {
       phoneNumber: ko.observable(),
       emailAddress: ko.observable(),
       preferredContact: ko.observable()
}
  };

  var titleOptions = [
    {
      value: 'Mr',
      setTitle: function () {
        RegistrationForm.customer.personalInfo.title("Mr");
      }
}, {
      value: 'Mrs',
      setTitle: function () {
        RegistrationForm.customer.personalInfo.title("Mrs");
      }
}, {
      value: 'Miss',
      setTitle: function () {
        RegistrationForm.customer.personalInfo.title("Miss");
      }
}, {
      value: 'Dr',
      setTitle: function () {
        RegistrationForm.customer.personalInfo.title("Dr");
      }
}];

  var titleSelect = ko.pureComputed(function () {
    if (customer.personalInfo.title() == null) {
      return "select"
    } else {
      return customer.personalInfo.title();
    }
  });

  var submit = function () {
    console.log(ko.toJSON(customer));
  };


  var init = function () {
    ko.applyBindings(RegistrationForm);
  };

  $(init);

  return {
    customer: customer,
    titleSelect: titleSelect,
    titleOptions: titleOptions,
    submit: submit
  };


}();