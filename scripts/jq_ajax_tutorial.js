$(function () {

    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    function addOrder(order) {
        $orders.append('<li>name: '+order.name + ', drink: ' + order.drink + '</li>');
    }

    $.ajax({
        type:'GET',
        url: 'http://test.com/api/orders',
        dataType: 'json',
        success: function (orders) {
            console.log(orders);
            var orderData = orders.orderData;
            $.each(orderData, function (i, order) {
                addOrder(order);
            });
        },
        error: function () {
            alert('error loading orders');
        }
    });

    $('#add-order').on('click', function () {
        
        var order = {
            name: $name.val(),
            drink: $drink.val(),
        };
        var orderJson = JSON.stringify(order);
        // var jsonOrder = $.toJSON(order);

        $.ajax({
            type: 'POST',
            url: 'http://test.com/api/addOrders',
            // data: order,
            data: orderJson,
            contentType: 'application/json',
            success: function (newOrder) {
                var newOrderJobj = JSON.parse(newOrder);
                addOrder(newOrderJobj.orderData);
            },
            error: function () {
                alert('add order error loading orders');
            }
        });

    });

});