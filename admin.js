$(document).ready(function () {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function renderProducts() {
        $("#admin-product-list").empty();
        products.forEach((product, index) => {
            $("#admin-product-list").append(`
                <tr>
                    <td>${product.name}</td>
                    <td>${product.price.toLocaleString()} VNĐ</td>
                    <td>
                        <button class="btn btn-danger delete-product" data-index="${index}">Xóa</button>
                    </td>
                </tr>
            `);
        });
    }

    $(document).on("click", ".delete-product", function () {
        let index = $(this).data("index");
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    });

    $("#add-product").click(function () {
        let name = prompt("Nhập tên sản phẩm:");
        let price = parseInt(prompt("Nhập giá sản phẩm:"));
        if (name && !isNaN(price)) {
            products.push({ name, price });
            saveProducts();
            renderProducts();
        }
    });

    renderProducts();

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    function renderOrders() {
        $("#order-list").empty();
        orders.forEach((order) => {
            let productsHTML = order.products.map(p => `<li>${p.name} - ${p.price.toLocaleString()} VNĐ (x${p.quantity})</li>`).join("");

            $("#order-list").append(`
                <tr>
                    <td>${order.username}</td>
                    <td>${order.fullName}</td>
                    <td>${order.phone}</td>
                    <td>${order.address}</td>
                    <td>
                        <ul>${productsHTML}</ul>
                    </td>
                    <td>${order.total.toLocaleString()} VNĐ</td>
                    <td>${order.status}</td>
                </tr>
            `);
        });
    }

    $("#view-orders").click(function () {
        $("#order-section").toggleClass("d-none");
        renderOrders();
    });

    renderOrders();
});