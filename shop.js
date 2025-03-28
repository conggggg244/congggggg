$(document).ready(function() {
    let jewelryProducts = [
        { id: 1, title: "Nhẫn Kim Cương Vàng Trắng", price: 5500000, image: "ảnh/1.jpg" },
        { id: 2, title: "Dây Chuyền Vàng 24K", price: 8200000, image: "ảnh/2.jpg" },
        { id: 3, title: "Bông Tai Ngọc Trai Tự Nhiên", price: 2900000, image: "ảnh/3.jpg" },
        { id: 4, title: "Lắc Tay Bạc Ý Cao Cấp", price: 1750000, image: "ảnh/4.webp" },
        { id: 5, title: "Charm Pandora Hình Tim", price: 1200000, image: "ảnh/5.webp" },
        { id: 6, title: "Dây Chuyền Hồ Ly Đá Tự Nhiên", price: 3100000, image: "ảnh/6.jpg" },
        { id: 7, title: "Nhẫn Bạc Đính Đá CZ", price: 980000, image: "ảnh/7.jpg" },
        { id: 8, title: "Bông Tai Vàng Hồng", price: 4500000, image: "ảnh/8.jpg" },
        { id: 9, title: "Lắc Chân Ngọc Trai", price: 2200000, image: "ảnh/9.jpg" },
        { id: 10, title: "Nhẫn Cưới Vàng 18K", price: 6500000, image: "ảnh/10.jpg" },
        { id: 11, title: "Dây Chuyền Bạc 925", price: 1100000, image: "ảnh/11.webp" },
        { id: 12, title: "Vòng Tay Đá Thạch Anh", price: 3800000, image: "ảnh/12.jpg" },
        { id: 13, title: "Hoa Tai Hình Ngôi Sao", price: 850000, image: "ảnh/13.jpg" },
        { id: 14, title: "Lắc Tay Kim Cương Nhân Tạo", price: 9700000, image: "ảnh/14.jpg" },
        { id: 15, title: "Dây Chuyền Đá Sapphire", price: 12300000, image: "ảnh/15.jpg" },
    ];

    let productHTML = "";
    jewelryProducts.forEach(product => {
        productHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Giá: ${product.price.toLocaleString()} VNĐ</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
        `;
    });

    $("#product-list").html(productHTML);

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    function getCart() {
        let user = getCurrentUser();
        return user ? JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [] : [];
    }

    function saveCart(cart) {
        let user = getCurrentUser();
        if (user) {
            localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
        }
    }

    function updateCartBadge() {
        let cart = getCart();
        $("#cart-count").text(cart.length);
    }

    $(document).on("click", ".add-to-cart", function() {
        let user = getCurrentUser();
        if (!user) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            return;
        }

        let productId = $(this).data("id");
        let productTitle = $(this).data("title");
        let productPrice = $(this).data("price");
        let productImage = $(this).data("image");

        let cart = getCart();
        let existingProduct = cart.find(p => p.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, title: productTitle, price: productPrice, image: productImage, quantity: 1 });
        }

        saveCart(cart);
        updateCartBadge();
        alert(`Đã thêm "${productTitle}" vào giỏ hàng!`);
    });

    updateCartBadge();
});
