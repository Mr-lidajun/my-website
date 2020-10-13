$(function () {

    var $orders = $('#orders');
    $.ajax({
        type:'GET',
        url: 'http://test.com/api/orders',
        dataType: 'json',
        success: function (orders) {
            var orderData = orders.orderData;
            $.each(orderData, function (i, order) {
                $orders.append('<li>name: '+order.name + ', drink: ' + order.drink + '</li>');
            });
            
        }
    });

});