
//Landing page helper functions

Meteor.subscribe("replies");
Template.landing.helpers({
    replies_function : function () {
        console.log(Replies.findOne({}));
        return (Replies.find({}, {limit: 1, sort:{timestamp:-1}}).fetch());

    },
    // tradeWizard login screen.png
    tableSettings : function () {
        return {
            rowsPerPage: 10,
            showNavigation: 'auto',
            fields: [
                { key: 'parentTradeId', label: 'Parent Trade ID'},
                { key: 'qty', label: 'Quantity' },
                { key: 'side', label: 'Side' },
                { key: 'avg_price', label: 'Average Price' },
                { key: 'status', label: 'Execution Status' },
                { key: 'readable_time', label: 'Time', hidden: false},
                { key: 'time', label: 'Time', sortDirection: 'descending', sortOrder: 0, hidden: true}
            ],
            showFilter: false,
            useFontAwesome: true
        };
    }

});

Template.landing.events({
    // 'submit form': function(event) {
    //     console.log("TEST")
    // }
});



Template.createOrderForm.events({
    'submit .submitOrderForm': function(event) {
        event.preventDefault();

        // console.log(event.type);
        // console.log("Form submitted");

        $('#createOrderModal').modal('hide');

        var target = event.target;
        var symbol = target.etf_symbol.value;
        var orderQty = target.orderQty.value;
        var strategy = target.strategy.value;
        var account = target.account.value;
        var side;
        console.log(target.sell_button.value);

        side = "sell";
        console.log(symbol);
        console.log(orderQty);
        console.log(strategy);
        console.log(account);
        console.log(side);


        //Call the request to the endpoint here

        Meteor.call("sendTradeRequest", symbol, orderQty, side, strategy, account, function(error, results) {
            // console.log(results.content); //results.data should be a JSON object
            console.log("Sent a trade request");
        });

    }
});

