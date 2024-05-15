class ProdcutModel {
  constructor(
    name, 
    description, 
    originalPrice, 
    reducePrice, 
    quantity, 
    img
) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.originalPrice = originalPrice;
    this.reducePrice = reducePrice;
    this.image = img;
  }
}

export default ProdcutModel;
