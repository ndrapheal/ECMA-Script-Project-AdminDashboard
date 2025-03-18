// controllers/apiController.js
const Products = require("../models/Product");
const Users = require("../models/Users");
const Brands = require("../models/Categories");

// eslint-disable-next-line no-unused-vars
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("private-key.txt", "utf8");


// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error });
  }
}; //done

//Lấy sản phẩm theo Id

exports.getProductById = async (req, res) => {
  try {
   const product = await Products.findOne({ productId: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error });
  }
};
// get user by id

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({ UserId: req.params.id });
    if (!user) {
      // log id
      console.log(req.params.id);
      return res.status(404).json({ message: "Người dùng  không tồn tại !" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tải dữ liệu người dùng", error });
  }
};

// API của cart


exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    // eslint-disable-next-line no-use-before-define
    let cart = await cart.findOne({ userId });

    if (!cart) {
      cart = new cart({ userId, products: [] });
    }

    const existingProduct = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Sản phẩm đã được thêm vào giỏ hàng" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi thêm sản phẩm vào giỏ hàng", error });
  }
}; // done
// getCart

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    // eslint-disable-next-line no-use-before-define
    const cart = await cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error });
  }
}; // done

// api admin

// delete

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Products.findOneAndDelete({
      productId: req.params.id,
    });
    // Log giá trị productId
    console.log("productId lấy được là:", req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.status(200).json({ message: "Sản phẩm đã được xóa" });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error); // Debug lỗi
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error });
  }
}; //done

// add

exports.addProduct = async (req, res) => {
  try {
    console.log("Dữ liệu từ client:", req.body);
    const {
      productId,
      name,
      price,
      specs,
      brand,
      image,
      rating,
      inStock,
      releaseDate,
    } = req.body;

    // Kiểm tra Id sản phẩm đã tồn tại hay chưa

    const existingProduct = await Products.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({ message: "Sản phẩm đã tồn tại!" });
    }

   const newProduct = new Products({
     productId,
     name,
     price,
     specs,
     brand,
     image,
     rating,
     inStock,
     releaseDate,
   });

   console.log("Sản phẩm chuẩn bị lưu:", newProduct);
   const savedProduct = await newProduct.save();
   console.log("Sản phẩm đã lưu:", newProduct);
   res.status(201).json({
     message: "Sản phẩm đã được thêm thành công!",
     product: savedProduct,
   });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error });
  }
}; // url: http://localhost:3500/api/products/ với method POST


//update product

exports.editProduct = async (req, res) => {
  try {
    console.log("Dữ liệu từ client:", req.body);

    const {
      productId,
      name,
      price,
      specs,
      brand,
      image,
      rating,
      inStock,
      releaseDate,
    } = req.body;

    const updatedProduct = await Products.findOneAndUpdate(
      { productId: productId }, 
      {
        name,
        price,
        specs,
        brand,
        image,
        rating,
        inStock,
        releaseDate,
      }, 
      { new: true } 
    );

    // Kiểm tra nếu sản phẩm không tồn tại
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm với productId này!" });
    }

    console.log("Sản phẩm đã được sửa:", updatedProduct);
    res.status(200).json({
      message: "Sản phẩm đã được cập nhật thành công!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Lỗi khi sửa sản phẩm:", error);
    res.status(500).json({ message: "Lỗi khi sửa sản phẩm", error });
  }
};


// lấy user

exports.getUser = async (req, res) => {
  try {
    console.log("Fetching users...");
    const users = await Users.find();
    // console.log("Users fetched:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};


// login

exports.login = async (req, res) => {
  const { username, passwords } = req.body;

  try {

    if (!username || !passwords) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    if (typeof passwords !== "string") {
      return res.status(400).json({ message: "Mật khẩu không hợp lệ!" });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await Users.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Thông tin user không chính xác!" });
    }

    // Kiểm tra mật khẩu trong cơ sở dữ liệu
    if (!user.passwords || typeof user.passwords !== "string") {
      return res
        .status(500)
        .json({ message: "Mật khẩu trong cơ sở dữ liệu không hợp lệ!" });
    }

    // So sánh mật khẩu
     if (user.passwords !== passwords) {
       return res.status(401).json({ message: "Mật khẩu không chính xác!" });
     }
    // Tạo JWT token
    const token = jwt.sign({ id: user._id }, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "2h",
    });

    // Trả về thông tin đăng nhập của user
    res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      userInfo: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Lỗi trong API login:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
  
};// done

// register

exports.register = async (req, res) => {
  const { username, passwords, name, email } = req.body;
  const count = await Users.countDocuments();
  try {
  
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Người dùng đã tồn tại!" });
    }

    
       const newUser = new Users({
         username,
         passwords,
         name,
         email,
         userId : count +1,
       });
       await newUser.save();
  
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("Lỗi trong API register:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
};//done


/* Danh mục */

// lấy tất cả brand :url: http://localhost:3500/api/categories/ với method POST

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brands.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh mục", error });
  }
};

// lấy brand theo id

exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brands.findOne({ brandId: req.params.id });
    if (!brand) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh mục", error });
  }
}; // done

// sửa brand

exports.updateBrand = async (req, res) => {
  const { brand } = req.body; 
  const { brandId } = req.params;

  if (!brand || brand.length < 2) {
    return res.status(400).json({ message: "Tên danh mục không hợp lệ!" });
  }

  try {
    const updatedCategory = await Brands.findByIdAndUpdate(
      brandId,
      { brand },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Danh mục không tồn tại!" });
    }

    res.json({ message: "Cập nhật thành công!", data: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};


// xóa Brand

exports.deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brands.findOneAndDelete({
      brandId: req.params.id,
    });
    if (!deletedBrand) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    res.status(200).json({ message: "Danh mục đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa danh mục", error });
  }
};

// thêm Brand

const generateBrandId = async () => {
  const count = await Brands.countDocuments(); // Đếm số danh mục hiện tại
  return (count + 1).toString(); // Sinh brandId mới
};

exports.addBrand = async (req, res) => {
  try {
    const { brand } = req.body; // Chỉ lấy thuộc tính 'brand' từ body
    if (!brand || typeof brand !== "string") {
      return res.status(400).json({ message: "Tên danh mục không hợp lệ!" });
    }

    const brandId = await generateBrandId(); // Gọi hàm sinh brandId

    const newCategory = await Brands.create({ brandId, brand });

    res.status(201).json({
      _id: { $oid: newCategory._id.toString() },
      brandId: newCategory.brandId,
      brand: newCategory.brand,
      message: "Thêm danh mục thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm danh mục", error });
  }
};



