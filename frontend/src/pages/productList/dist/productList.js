"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var Table_1 = require("@mui/material/Table");
var TableBody_1 = require("@mui/material/TableBody");
var TableCell_1 = require("@mui/material/TableCell");
var TableContainer_1 = require("@mui/material/TableContainer");
var TableHead_1 = require("@mui/material/TableHead");
var TableRow_1 = require("@mui/material/TableRow");
var Paper_1 = require("@mui/material/Paper");
var icons_material_1 = require("@mui/icons-material");
var Button_1 = require("@mui/material/Button");
var Add_1 = require("@mui/icons-material/Add");
var productService_1 = require("../../services/productService/productService");
require("./productList.css");
var cartService_1 = require("../../services/cartService/cartService");
var material_1 = require("@mui/material");
var react_router_1 = require("react-router");
var ProductList = function (_a) {
    var username = _a.username, userRole = _a.userRole;
    var _b = react_1.useState([]), products = _b[0], setProducts = _b[1];
    var _c = react_1.useState([]), currentCart = _c[0], setCurrentCart = _c[1];
    var navigate = react_router_1.useNavigate();
    var isAdmin = userRole === 'admin';
    var productService = new productService_1["default"]();
    var cartService = new cartService_1["default"]();
    var getProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productService.getProducts()];
                case 1:
                    products = _a.sent();
                    if (products) {
                        setProducts(products);
                    }
                    console.log(products);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getProducts();
    }, []);
    var addToCart = function (id) { return function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cartService.addToCart(id)];
                case 1:
                    response = _a.sent();
                    if (response) {
                        console.log(response);
                        // setCurrentCart(response.orderedProducts);
                    }
                    return [2 /*return*/];
            }
        });
    }); }; };
    var editProduct = function (id) { return function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            navigate('product', { id: id });
            return [2 /*return*/];
        });
    }); }; };
    var removeProduct = function (id) { return function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productService.removeProduct(id)];
                case 1:
                    response = _a.sent();
                    if (response) {
                        getProducts();
                        // setCurrentCart(response.orderedProducts);
                    }
                    return [2 /*return*/];
            }
        });
    }); }; };
    var renderButton = function (row) {
        if (isAdmin) {
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(Button_1["default"], { sx: { mr: 2 }, variant: "contained", onClick: editProduct(row.id) },
                    react_1["default"].createElement(icons_material_1.Edit, null)),
                react_1["default"].createElement(Button_1["default"], { variant: "contained", onClick: removeProduct(row.id) },
                    react_1["default"].createElement(icons_material_1.Delete, null))));
        }
        return true ? (react_1["default"].createElement(Button_1["default"], { variant: "contained", onClick: addToCart(row.id), endIcon: react_1["default"].createElement(Add_1["default"], null) }, "Dodaj")) : (react_1["default"].createElement(Button_1["default"], { variant: "contained", endIcon: react_1["default"].createElement(Add_1["default"], null), disabled: true }, "W koszyku"));
    };
    return (react_1["default"].createElement("div", { style: { width: '100%', alignItems: 'center' } },
        react_1["default"].createElement("div", { style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center'
            } },
            react_1["default"].createElement(material_1.Box, { sx: {
                    width: 1,
                    display: { xs: 'flex', md: 'flex' },
                    mb: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                } },
                react_1["default"].createElement("div", { style: { flex: 1 } }),
                react_1["default"].createElement("h3", { style: { flex: 1 } }, "Lista dost\u0119pnych pojazd\u00F3w:"),
                react_1["default"].createElement("div", { style: {
                        flex: 1, justifyContent: 'flex-end', flexDirection: 'row', display: 'flex'
                    } }, isAdmin && (react_1["default"].createElement(Button_1["default"], { variant: "contained", endIcon: react_1["default"].createElement(Add_1["default"], null), sx: { ml: 'auto' }, onClick: function () { navigate('product'); } }, "Dodaj nowy pojazd")))),
            react_1["default"].createElement(TableContainer_1["default"], { component: Paper_1["default"] },
                react_1["default"].createElement(Table_1["default"], { sx: { minWidth: 650 }, "aria-label": "simple table" },
                    react_1["default"].createElement(TableHead_1["default"], null,
                        react_1["default"].createElement(TableRow_1["default"], null,
                            react_1["default"].createElement(TableCell_1["default"], null, "Marka"),
                            react_1["default"].createElement(TableCell_1["default"], { align: "right" }, "Model"),
                            react_1["default"].createElement(TableCell_1["default"], { align: "right" }, "Rodzaj nadwozia"),
                            react_1["default"].createElement(TableCell_1["default"], { align: "right" }, "Cena"),
                            react_1["default"].createElement(TableCell_1["default"], { align: "right" }, "Kraj produkcji"),
                            react_1["default"].createElement(TableCell_1["default"], { align: "right" }, "Ilo\u015B\u0107 dost\u0119pnych pojazd\u00F3w"),
                            react_1["default"].createElement(TableCell_1["default"], { align: "right" }, isAdmin ? 'Opcje' : 'Dodaj do koszyka'))),
                    react_1["default"].createElement(TableBody_1["default"], null, products.map(function (row, idx) { return (react_1["default"].createElement(TableRow_1["default"], { key: row.name + row.type + idx.toString(), sx: { '&:last-child td, &:last-child th': { border: 0 } } },
                        react_1["default"].createElement(TableCell_1["default"], { component: "th", scope: "row" }, row.name),
                        react_1["default"].createElement(TableCell_1["default"], { align: "right" }, row.type),
                        react_1["default"].createElement(TableCell_1["default"], { align: "right" }, row.subtype),
                        react_1["default"].createElement(TableCell_1["default"], { align: "right" }, row.price),
                        react_1["default"].createElement(TableCell_1["default"], { align: "right" }, row.manufacturer),
                        react_1["default"].createElement(TableCell_1["default"], { align: "right" }, row.quantityInStock),
                        react_1["default"].createElement(TableCell_1["default"], { align: "right" }, renderButton(row)))); })))))));
};
exports["default"] = ProductList;
