package com.bhaskar.inventory.service;

import com.bhaskar.inventory.collection.Category;
import com.bhaskar.inventory.collection.Product;
import com.bhaskar.inventory.collection.product.BasicInfo;
import com.bhaskar.inventory.dto.Inventory;
import com.bhaskar.inventory.dto.PriceActivity;
import com.bhaskar.inventory.dto.PriceUpdate;
import com.bhaskar.inventory.exception.ProductNotFoundException;
import com.bhaskar.inventory.repo.CategoryRepository;
import com.bhaskar.inventory.repo.CustomRepo;
import com.bhaskar.inventory.repo.ProductRepository;
import com.bhaskar.inventory.response.InventoryRes;
import com.bhaskar.inventory.response.ProductDetail;
import com.bhaskar.inventory.response.ProductsRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CustomRepo customRepo;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, CustomRepo customRepo) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.customRepo = customRepo;
    }

    public Product saveProduct(Product product) {
        Inventory inventory = new Inventory(null, product.getBasicInfo().getStock(), 0);
        product.setInventory(inventory);
        PriceActivity priceActivity = new PriceActivity(product.getBasicInfo().getSalePrice(), product.getBasicInfo().getRetailPrice());
        product.setPrices(Collections.singletonList(priceActivity));
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        Inventory inventory = new Inventory(null, product.getBasicInfo().getStock(), 0);
        product.setInventory(inventory);
        PriceActivity priceActivity = new PriceActivity(product.getBasicInfo().getSalePrice(), product.getBasicInfo().getRetailPrice());
        product.setPrices(Collections.singletonList(priceActivity));
        product.setProductId(product.getBasicInfo().getBarcode());
        return customRepo.updateProduct(product);
    }

    public void deleteProduct(String productId) {
         productRepository.deleteById(productId);
    }

    public ProductsRes getProductsByCategory(String categoryId) {
        ProductsRes productsRes = new ProductsRes();
        List<ProductDetail> productDetails = new ArrayList<>();
        List<Product> products = productRepository.findAllByBasicInfoCategory(categoryId);
        products.forEach(product -> {
            ProductDetail productDetail = new ProductDetail();
            mapProduct(productDetail, product);
            productDetails.add(productDetail);
        });

        productsRes.setProductDetailList(productDetails);
        return productsRes;
    }

    public ProductsRes getProducts() {
        ProductsRes productsRes = new ProductsRes();
        List<ProductDetail> productDetails = new ArrayList<>();

        List<Product> products = productRepository.findAll();
        products.forEach(product -> {
            ProductDetail productDetail = new ProductDetail();
            mapProduct(productDetail, product);
            productDetails.add(productDetail);
        });

        productsRes.setProductDetailList(productDetails);
        return productsRes;
    }

    public ProductsRes searchProducts(String searchTerm) {
        ProductsRes productsRes = new ProductsRes();
        List<ProductDetail> productDetails = new ArrayList<>();

        List<Product> products = customRepo.searchProducts(searchTerm);
        products.forEach(product -> {
            ProductDetail productDetail = new ProductDetail();
            mapProduct(productDetail, product);
            productDetails.add(productDetail);
        });

        productsRes.setProductDetailList(productDetails);
        return productsRes;
    }

    public List<InventoryRes> inventory() {
        List<Product> products = productRepository.findAll();
        List<InventoryRes> inventoryResList = new ArrayList<>();
        products.forEach(product -> {
            InventoryRes inventoryRes = new InventoryRes();
            product.getPrices().stream().max(Comparator.comparing(PriceActivity::getCreated)).ifPresent(priceActivity -> {
                inventoryRes.setSalePrice(priceActivity.getSalePrice());
                inventoryRes.setRetailPrice(priceActivity.getRetailPrice());
            });
            inventoryRes.setBarcode(product.getBasicInfo().getBarcode());
            inventoryRes.setProductId(product.getBasicInfo().getBarcode());
            inventoryRes.setProductName(product.getBasicInfo().getProductName());
            inventoryRes.setStock(product.getInventory().getStock());
            inventoryRes.setTax(Optional.ofNullable(product.getBasicInfo().getTax()).orElse(BigDecimal.ZERO));
            inventoryRes.setSkuImageUrl(product.getBasicInfo().getImageUrls());
            inventoryResList.add(inventoryRes);
        });

        return inventoryResList;
    }

    public Product getProductInfo(String id) {
        return productRepository.findById(id).orElse(new Product());
    }


    public ProductDetail getProduct(String id) {
        ProductDetail productDetail = new ProductDetail();
        productRepository.findById(id)
                .map(product -> mapProduct(productDetail, product))
                .<ProductNotFoundException>orElseThrow(() -> {
                    throw new ProductNotFoundException("No Product");
                });
        return productDetail;
    }

    public void updatePriceActivity(PriceUpdate priceUpdate) {
        Query query = new Query().addCriteria(where("_id").is(priceUpdate.getPriceId()));
        Update update = new Update();
        update.addToSet("prices", priceUpdate.getPriceActivity());
        customRepo.updateProduct(query, update);
    }

    public void updateTax(BasicInfo basicInfo) {
        Query query = new Query().addCriteria(where("_id").is(basicInfo.getBarcode()));
        Update update = new Update();
        update.set("basicInfo.tax", basicInfo.getTax());
        customRepo.updateProduct(query, update);
    }

    public void updateInventory(Inventory inventory) {
        Query query = new Query().addCriteria(where("_id").is(inventory.getBarcode()));
        Update update = new Update();
        update.set("inventory.stock", inventory.getStock());
        customRepo.updateProduct(query, update);
    }

    private ProductDetail mapProduct(ProductDetail productDetail, Product product) {
        productDetail.setBarcode(product.getBasicInfo().getBarcode());
        productDetail.setName(product.getBasicInfo().getProductName());
        productDetail.setDesc(product.getBasicInfo().getDescription());
        productDetail.setImageUrls(product.getBasicInfo().getImageUrls());
        productDetail.setSalePrice(product.getPrices().stream().sorted().findFirst().map(PriceActivity::getSalePrice).orElse(BigDecimal.ZERO));
        productDetail.setAvailable(product.getInventory().getStock());

        if (Optional.ofNullable(product.getBasicInfo().getTax()).isPresent()) {
            productDetail.setTax(product.getBasicInfo().getTax());
        } else {
            Category category = categoryRepository.getCategoryByCategoryCode(product.getBasicInfo().getCategory());
            if (!Optional.ofNullable(Optional.ofNullable(category).orElse(new Category()).getTax()).orElse(BigDecimal.ZERO).equals(BigDecimal.ZERO)) {
                productDetail.setTax(category.getTax());
            } else {
                productDetail.setTax(customRepo.getTax());
            }

        }
        return productDetail;
    }

}
