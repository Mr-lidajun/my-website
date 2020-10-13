
// Get an Order
// Mock响应模板
//模拟get请求
Mock.mock('http://test.com/api/orders', 'get', {
    "orderData": [{
        'id':1,
        'name':'James',
        'drink':'Coffee'
    },{
        'id':2,
        'name':'John',
        'drink':'Milk'
    }]
});

// Add an Order
//模拟post请求,外层的Mock只负责拦截接口和方法的定义
Mock.mock('http://test.com/api/addOrders', 'post', function (option) {
    //请求相关的参数
    console.log(option);
    var jsonOrder = JSON.parse(option.body);
    //模拟假数据需要重新写Mock
    return Mock.mock({
        status:200,
        message:'@cword(4,9)',
        orderData: {
            'id':3,
            'name':jsonOrder.name,
            'drink':jsonOrder.drink
        }
    });
});