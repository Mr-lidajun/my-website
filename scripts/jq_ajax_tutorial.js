$(function () {

    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    var orderTemplate = "" +
    "<li>" +
    "<p><Strong>Name: </Strong> {{name}}</p>" + 
    "<p><Strong>Drink: </Strong> {{drink}}</p>" + 
    "<button data-id='{{id}}' class='remove'>X</button>" +
    "</li>";

    function addOrder(order) {
        $orders.append(Mustache.render(orderTemplate, order));
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

    $orders.delegate('.remove', 'click', function () {

        var $li = $(this).closest('li');

        $.ajax({
            type: 'DELETE',
            url: 'http://test.com/api/orders/' + $(this).attr('data-id'),
            success: function (result) {
                console.log(result);
                $li.fadeOut(300, function() {
                    $li.remove();
                });
            }
        });
    });

});