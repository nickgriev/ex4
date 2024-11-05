/**
 * Product
 *
 * Товар
 * Имеет название, цену, описание и id
 */
var Product = /** @class */ (function () {
    function Product(name, price, description, id) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
    }
    Product.prototype.getInfo = function () {
        return "Product: ".concat(this.name, ", Price: ").concat(this.price, ", Description: ").concat(this.description, ", ID: ").concat(this.id);
    };
    return Product;
}());
/**
 * Cart
 *
 * Корзина
 * Имеет список продуктов
 */
var Cart = /** @class */ (function () {
    function Cart() {
        this.products = [];
    }
    Cart.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    Cart.prototype.removeProduct = function (id) {
        this.products = this.products.filter(function (product) { return product.id !== id; });
    };
    Cart.prototype.getInfo = function () {
        return this.products.map(function (product) { return product.getInfo(); }).join('\n');
    };
    Cart.prototype.getTotalPrice = function () {
        return this.products.reduce(function (total, product) { return total + product.price; }, 0);
    };
    Cart.prototype.clear = function () {
        this.products = [];
    };
    return Cart;
}());
/**
 * OrderStatus
 *
 * Статус заказа
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["SHIPPED"] = "shipped";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (OrderStatus = {}));
/**
 * Order
 *
 * Заказ
 * Имеет id, список продуктов и статус
 */
var Order = /** @class */ (function () {
    function Order(id, products, status) {
        this.id = id;
        this.products = products;
        this.status = status;
    }
    Order.prototype.getInfo = function () {
        return "Order: ".concat(this.id, ", Status: ").concat(this.status, ", Products: ").concat(this.products.map(function (product) { return product.getInfo(); }).join('\n'));
    };
    Order.prototype.changeStatus = function (status) {
        this.status = status;
    };
    Order.prototype.getTotalPrice = function () {
        return this.products.reduce(function (total, product) { return total + product.price; }, 0);
    };
    return Order;
}());
/**
 * OrderManager
 *
 * Управление заказами
 * Добавление, получение информации, изменение статуса
 */
var OrderManager = /** @class */ (function () {
    function OrderManager() {
        this.orders = [];
    }
    OrderManager.prototype.addOrder = function (order) {
        this.orders.push(order);
    };
    OrderManager.prototype.getInfo = function () {
        return this.orders.map(function (order) { return order.getInfo(); }).join('\n');
    };
    OrderManager.prototype.changeStatus = function (id, status) {
        console.log(this.orders);
        var order = this.orders.find(function (order) { return order.id === id; });
        if (order) {
            order.changeStatus(status);
        }
    };
    OrderManager.prototype.createOrderFromCart = function (cart) {
        var order = new Order(genUUID(), cart.products, OrderStatus.PENDING);
        this.addOrder(order);
    };
    return OrderManager;
}());
/**
 * ProductManager
 *
 * Управление товарами
 * Доступные товары, добавление, удаление, получение информации, изменение информации
 */
var ProductManager = /** @class */ (function () {
    function ProductManager() {
        this.products = [];
    }
    ProductManager.prototype.getInfo = function () {
        return this.products.map(function (product) { return product.getInfo(); }).join('\n');
    };
    ProductManager.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    ProductManager.prototype.removeProduct = function (id) {
        this.products = this.products.filter(function (product) { return product.id !== id; });
    };
    ProductManager.prototype.changeProductInfo = function (id, name, price, description) {
        var product = this.products.find(function (product) { return product.id === id; });
        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
        }
    };
    ProductManager.prototype.getProductInfo = function (id) {
        var product = this.products.find(function (product) { return product.id === id; });
        return product ? product.getInfo() : 'Product not found';
    };
    return ProductManager;
}());
console.log('Инициализация менеджеров и корзины...');
var productManager = new ProductManager();
var cart = new Cart();
var orderManager = new OrderManager();
console.log('\n=== Работа с товарами ===');
console.log('Добавляем два тестовых товара в список товаров...');
productManager.addProduct(new Product('Product 1', 100, 'Description 1', genUUID()));
productManager.addProduct(new Product('Product 2', 200, 'Description 2', genUUID()));
console.log('\n=== Работа с корзиной ===');
console.log('Добавляем оба товара в корзину...');
cart.addProduct(productManager.products[0]);
cart.addProduct(productManager.products[1]);
console.log('\n=== Создание заказа ===');
console.log('Создаем новый заказ на основе корзины...');
orderManager.createOrderFromCart(cart);
console.log('\nТекущий статус заказов:');
console.log(orderManager.getInfo());
console.log('\nМеняем статус заказа на "отправлен"...');
orderManager.changeStatus(orderManager.orders[0].id, OrderStatus.SHIPPED);
console.log('\nСтатус заказов после изменения:');
console.log(orderManager.getInfo());
console.log('\n=== Модификация корзины ===');
console.log('Удаляем первый товар из корзины...');
cart.removeProduct(cart.products[0].id);
console.log('\nСодержимое корзины после удаления:');
console.log(cart.getInfo());
console.log('\n=== Модификация товаров ===');
console.log('Обновляем информацию о первом товаре...');
productManager.changeProductInfo(productManager.products[0].id, 'Updated Product 1', 150, 'Updated Description 1');
console.log('\nСписок товаров после обновления:');
console.log(productManager.getInfo());
console.log('\nУдаляем первый товар из списка товаров...');
productManager.removeProduct(productManager.products[0].id);
console.log('\nСписок товаров после удаления:');
console.log(productManager.getInfo());
console.log('\nДобавляем новый товар в список...');
productManager.addProduct(new Product('Product 3', 300, 'Description 3', genUUID()));
console.log('\nОбновленный список товаров:');
console.log(productManager.getInfo());
console.log('\n=== Информация о товаре ===');
console.log('Получаем информацию о первом товаре:');
console.log(productManager.getProductInfo(productManager.products[0].id));
console.log('\n=== Итоговая стоимость корзины ===');
console.log("\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0435: ".concat(cart.getTotalPrice()));
console.log('\n=== Очистка корзины ===');
console.log('Очищаем корзину...');
cart.clear();
console.log('\nСодержимое пустой корзины:');
console.log(cart.getInfo());
console.log('\nСписок доступных товаров:');
console.log(productManager.getInfo());
console.log('\nСписок текущих заказов:');
console.log(orderManager.getInfo());
console.log('\nИтоговая стоимость пустой корзины:');
console.log(cart.getTotalPrice());
// Нашел в интернете
function genUUID() {
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return uuid;
}
