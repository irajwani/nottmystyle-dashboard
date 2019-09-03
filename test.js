var selectedBrands = ["Armani", "LV"],
selectedCategory = "Accessories", 
selectedType = "Dresses", 
selectedConditions = ["New With Tags", "Slightly Used"], 
selectedSize = "S / 8 / 4";

var products = [
    {name: "A", brand: "Armani", category: "Men", type: "Shoes", size: "13 / 14", condition: "New Without Tags"},
    {name: "B", brand: "LV", category: "Women", type: "Dresses", size: "S / 8 / 4", condition: "Slightly Used"},
    {name: "C", brand: "Guess", category: "Accessories", type: "Watches", size: false, condition: "New Without Tags"},
    {name: "D", brand: "Gucci", category: "Women", type: "Skirts", size: "S / 8 / 4", condition: "New With Tags"},
]

// products = selectedBrands.length > 0 ? products.filter( (product) => selectedBrands.includes(product.brand)) : products;
// products = products.filter( (product) => selectedCategory == product.category);
// products = selectedType ? products.filter( (product) => selectedType == product.type ) : products;
// products = selectedConditions.length > 0 ? products.filter( (product) => selectedConditions.includes(product.condition)) : products;
// products = selectedSize ? products.filter( (product) => selectedSize == product.size ) : products;

var brandsProducts, categoryProducts, typeProducts, conditionsProducts, sizeProducts;

// console.log(products);
brandsProducts = selectedBrands.length > 0 ? products.filter( (product) => selectedBrands.includes(product.brand)) : [];
// console.log(products);
categoryProducts = selectedCategory ? products.filter( (product) => selectedCategory == product.category) : [];
typeProducts = selectedType ? products.filter( (product) => selectedType == product.type ) : [];
conditionsProducts = selectedConditions.length > 0 ? products.filter( (product) => selectedConditions.includes(product.condition)) : [];
sizeProducts = selectedSize ? products.filter( (product) => selectedSize == product.size ) : [];

brandsProducts = brandsProducts.concat(categoryProducts, typeProducts, conditionsProducts, sizeProducts);
// console.log(brandsProducts);
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

products = brandsProducts.filter(onlyUnique);
console.log(products);

// console.log(brandsProducts, "&&", categoryProducts, "&&", typeProducts, "&&", conditionsProducts,"&&",sizeProducts);