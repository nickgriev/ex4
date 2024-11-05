/**
 * Product
 *
 * Товар
 * Имеет название, цену, описание и id
 */
class Product {
    name: string;
    price: number;
    description: string;
    id: string;

    constructor(name: string, price: number, description: string, id: string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
    }

    getInfo() {
        return `Product: ${this.name}, Price: ${this.price}, Description: ${this.description}, ID: ${this.id}`;
    }
}

/**
 * Cart
 *
 * Корзина
 * Имеет список продуктов
 */
class Cart {
    products: Product[] = [];

    addProduct(product: Product) {
        this.products.push(product);
    }

    removeProduct(id: string) {
        this.products = this.products.filter(product => product.id !== id);
    }

    getInfo() {
        return this.products.map(product => product.getInfo()).join('\n');
    }

    getTotalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }

    clear() {
        this.products = [];
    }
}

/**
 * OrderStatus
 *
 * Статус заказа
 */
enum OrderStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

/**
 * Order
 *
 * Заказ
 * Имеет id, список продуктов и статус
 */
class Order {
    id: string;
    products: Product[];
    status: OrderStatus;

    constructor(id: string, products: Product[], status: OrderStatus) {
        this.id = id;
        this.products = products;
        this.status = status;
    }

    getInfo() {
        return `Order: ${this.id}, Status: ${this.status}, Products: ${this.products.map(product => product.getInfo()).join('\n')}`;
    }

    changeStatus(status: OrderStatus) {
        this.status = status;
    }

    getTotalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}

/**
 * OrderManager
 *
 * Управление заказами
 * Добавление, получение информации, изменение статуса
 */
class OrderManager {
    orders: Order[] = [];

    addOrder(order: Order) {
        this.orders.push(order);
    }

    getInfo() {
        return this.orders.map(order => order.getInfo()).join('\n');
    }

    changeStatus(id: string, status: OrderStatus) {
        console.log(this.orders);
        const order = this.orders.find(order => order.id === id);
        if (order) {
            order.changeStatus(status);
        }
    }

    createOrderFromCart(cart: Cart) {
        const order = new Order(genUUID(), cart.products, OrderStatus.PENDING);
        this.addOrder(order);
    }
}

/**
 * ProductManager
 *
 * Управление товарами
 * Доступные товары, добавление, удаление, получение информации, изменение информации
 */
class ProductManager {
    products: Product[] = [];

    getInfo() {
        return this.products.map(product => product.getInfo()).join('\n');
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    removeProduct(id: string) {
        this.products = this.products.filter(product => product.id !== id);
    }

    changeProductInfo(id: string, name: string, price: number, description: string) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
        }
    }

    getProductInfo(id: string) {
        const product = this.products.find(product => product.id === id);
        return product ? product.getInfo() : 'Product not found';
    }
}

console.log('Инициализация менеджеров и корзины...');
const productManager = new ProductManager();
const cart = new Cart();
const orderManager = new OrderManager();

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
console.log(`Общая стоимость товаров в корзине: ${cart.getTotalPrice()}`);

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
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return uuid;
}
