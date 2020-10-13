
// Mock响应模板
Mock.mock('http://test.com/api/orders', {
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