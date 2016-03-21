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
    },
    address: {
      residential: {
        street: ko.observable(),
        city: ko.observable(),
        postCode: ko.observable(),
        country: ko.observable()
      },
      postal: {
        type: ko.observable(),
        streetAddress: {
          street: ko.observable(),
          city: ko.observable(),
          postCode: ko.observable(),
          country: ko.observable()
        },
        poBoxAddress: {
          poBox: ko.observable(),
          city: ko.observable(),
          postCode: ko.observable(),
          country: ko.observable()
        }
      }
    },
    creditCards: ko.observableArray(),
    interests: ko.observableArray()
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

   var addCreditCard = function () {
     customer.creditCards.push({
       name: ko.observable(), 
       number: ko.observable(), 
       expiryDate: ko.observable()});
   };
  
  var deleteCreditCard = function(card) {
    console.log("Deleting credit card with number:" + card.number());
    customer.creditCards.remove(card);
  };
  
  var init = function () {
     addCreditCard();
    ko.applyBindings(RegistrationForm);
  };

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


	var clear = function () {
		console.log("Clear customer model");
		traverseAndClearModel(customer);
		//add the first credit card
		addCreditCard();
	};
  
  	var traverseAndClearModel = function(jsonObj) {
		$.each(jsonObj, function(key,val){
			if(ko.isObservable(val)) {
				if(val.removeAll != undefined) {
					val.removeAll();
				} else {
					val(null);
				}
			} else {
				traverseAndClearModel(val);
			} 
		});
	};

  $(init);

  return {
    customer: customer,
    titleSelect: titleSelect,
    titleOptions: titleOptions,
    addCreditCard: addCreditCard,
    submit: submit, 
    deleCreditCard: deleteCreditCard,
    clear: clear
  };


}();