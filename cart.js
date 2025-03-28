$(document).ready(function () {
    function formatNumber(num) {
        return num.toLocaleString("vi-VN");
    }

    function parsePrice(priceString) {
        return parseInt(priceString.replace(/,/g, "").replace(" VNĐ", ""));
    }

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartHTML = `<tr><td colspan="6" class="text-center">Giỏ hàng trống.</td></tr>`;
        } else {
            cart.forEach((item, index) => {
                let price = parsePrice(item.price);
                let quantity = item.quantity || 1;
                let itemTotal = price * quantity;
                totalPrice += itemTotal;

                cartHTML += `
                    <tr>
                        <td>${item.title}</td>
                        <td>${formatNumber(price)} VNĐ</td>
                        <td>
                            <button class="btn btn-sm btn-danger update-qty" data-index="${index}" data-type="minus">-</button>
                            <span class="mx-2">${quantity}</span>
                            <button class="btn btn-sm btn-success update-qty" data-index="${index}" data-type="plus">+</button>
                        </td>
                        <td>${formatNumber(itemTotal)} VNĐ</td>
                        <td>
                            <button class="btn btn-sm btn-warning remove-item" data-index="${index}">Xóa</button>
                        </td>
                    </tr>
                `;
            });
        }

        $("#cart-items").html(cartHTML);
        $("#total-price").text(formatNumber(totalPrice) + " VNĐ");
        localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật lại giỏ hàng
    }

    $(document).on("click", ".update-qty", function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = $(this).data("index");
        let type = $(this).data("type");

        if (type === "plus") {
            cart[index].quantity++;
        } else if (type === "minus") {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    });

    $(document).on("click", ".remove-item", function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = $(this).data("index");
        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    });

    loadCart();
});
