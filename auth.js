$(document).ready(function () {
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "user", password: "user123", role: "user" }
    ];

    localStorage.setItem("accounts", JSON.stringify(accounts));

    $("#register-form").submit(function (event) {
        event.preventDefault();
        let username = $("#reg-username").val().trim();
        let password = $("#reg-password").val().trim();

        if (username === "" || password === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        let existingUser = accounts.find(acc => acc.username === username);
        if (existingUser) {
            alert("Tên đăng nhập đã tồn tại, vui lòng chọn tên khác!");
            return;
        }

        let newUser = { username, password, role: "user" };
        accounts.push(newUser);
        localStorage.setItem("accounts", JSON.stringify(accounts));

        alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
    });

    $("#login-form").submit(function (event) {
        event.preventDefault();
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();

        if (username === "" || password === "") {
            alert("Vui lòng nhập tên đăng nhập và mật khẩu!");
            return;
        }

        let storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

        let user = storedAccounts.find(acc => acc.username === username && acc.password === password);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            alert(`Đăng nhập thành công với tư cách ${user.role === "admin" ? "Quản trị viên" : "Người dùng"}!`);

            if (user.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "index.html";
            }
        } else {
            alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
        }
    });

    let currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser) {
        $("#login-link, #register-link").hide();
        $("#user-info").text(`Xin chào, ${currentUser.username}`).show();
        $("#logout").show();

        if (currentUser.role === "admin") {
            $("#admin-link").show();
        } else {
            $("#admin-link").hide();
        }
    } else {
        $("#user-info, #logout, #admin-link").hide();
    }

    $("#logout").click(function () {
        localStorage.removeItem("user");
        alert("Bạn đã đăng xuất!");
        location.reload();
    });
});
